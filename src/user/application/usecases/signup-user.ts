import { inject, singleton, } from '@ioc/container';

import { User, } from '@shared/domain/models/user.model';
import type { FileService, } from '@shared/domain/services/file.service';
import type { EmailService, } from '@shared/domain/services/email.service';
import type { ConfigService, } from '@shared/domain/services/config.service';
import type { UserRepository, } from '@user/domain/repositories/user';

import { NewUserDTO, } from '../dtos/new-user.dto';
import { UserBuilder, } from '../builders/user.builder';
import { EmailBuilder, } from '../builders/email.builder';
import { SignupUserPort, } from './ports/signup-user.port';

@singleton(SignupUserUseCase)
export class SignupUserUseCase implements SignupUserPort {
  constructor(
    @inject('services:file') private readonly fileService: FileService,
    @inject('services:email') private readonly emailService: EmailService,
    @inject('services:config') private readonly configService: ConfigService,
    @inject('repositories:user') private readonly userRepository: UserRepository,
  ) {}

  async signup(data: NewUserDTO): Promise<User> {
    const user = new UserBuilder({ ...data, })
      .build();
    
    const exists = await this.userRepository.findByEmailOrUsername(user.email, user.username);
    if (exists) throw new Error('Users exists');

    const result = await this.userRepository.create(user);
    if (!result) throw new Error('Cannot create user');

    await this.sendSignupEmail(result);

    return result;
  }

  private async sendSignupEmail(user: User): Promise<void> {
    const path = 'text.txt';

    const template = await this.fileService.readLocalFile(path);
    if (!template) return;

    const email = new EmailBuilder({
      from: this.configService.get<string>('SMTP_USER')!,
      to: user?.email,
      subject: 'Te damos la bienvenida',
      body: template.toString() ?? 'Registro satisfactorio',
    })
      .withAMP(true)
      .build();

    await this.emailService.send(email);
  }
}