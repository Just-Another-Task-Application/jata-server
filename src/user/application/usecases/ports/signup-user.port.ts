import { User, } from '@shared/domain/models/user.model';
import { NewUserDTO, } from '@user/application/dtos/new-user.dto';

export interface SignupUserPort {
  signup(data: NewUserDTO): Promise<User>;
}