import { 
  Max, 
  IsDate, 
  IsEnum, 
  IsEmail, 
  IsOptional, 
  IsStrongPassword,
  IsString, 
} from 'class-validator';

import { User, } from '@shared/domain/models/user.model';
import { Gender } from '@shared/domain/enums/gender.enum';

type NewUserRequiredFields = 'email'
  | 'username'
  | 'phoneNumber'
  | 'givenName'
  | 'familyName'
  | 'picture'
  | 'birthdate'
  | 'password'
  | 'gender';

export class NewUserDTO implements Pick<User, NewUserRequiredFields> {
  @IsEmail()
  @Max(320)
  email: string;

  @Max(50)
  username: string;

  @Max(15)
  phoneNumber: string;

  @Max(64)
  givenName: string;

  @Max(80)
  familyName: string;

  @IsString()
  picture: string;

  @IsDate()
  birthdate: Date;

  @IsOptional()
  @IsStrongPassword()
  password?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;
}