import { 
  Transporter, 
  createTransport,
} from 'nodemailer';

import { inject, injectable, } from '@ioc/container';

import type { Email, } from '@shared/domain/models/email.model';
import type { EmailService, } from '@shared/domain/services/email.service';
import type { ConfigService, } from '@shared/domain/services/config.service';

@injectable()
export class EmailImplService implements EmailService {
  private readonly transporter: Transporter;

  constructor(
    @inject('services:config') private readonly configService: ConfigService,
  ) {
    this.transporter = createTransport({
      host: this.configService.get('SMTP_HOST'),
      port: this.configService.get<number>('SMTP_PORT', 0),
      secure: true,
      auth: {
        type: 'OAUTH2',
        user: this.configService.get('SMTP_USER'),
        clientId: this.configService.get('SMTP_CLIENT_ID'),
        clientSecret: this.configService.get('SMTP_CLIENT_SECRET'),
        serviceClient: this.configService.get('SMTP_CLIENT_ID'),
      },
      pool: true,
      maxConnections: 10,
    });
  }

  async send(email: Email): Promise<boolean> {
    try {
      const verified = await this.transporter.verify();
      if (!verified) return false;

      if (this.transporter.isIdle()) await this.transporter.sendMail({
        from: email?.from,
        to: email?.to,
        cc: email?.cc,
        bcc: email?.bcc,
        subject: email?.subject,
        ...(email?.amp && {
          amp: email?.body,
        }),
        ...(!email?.amp && {
          html: email?.body,
        }),
        attachments: email?.attachments,
      });

      return true;
    } catch (err) {
      return false;
    } finally {
      this.transporter.close();
    }
  }

  async formatTemplate(
    template: Buffer | string, 
    fields: Record<string, any>
  ): Promise<string> {
    throw new Error('not implemented');
  }
}