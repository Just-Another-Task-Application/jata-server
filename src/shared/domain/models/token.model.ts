import { Model, } from './model';

export interface Token extends Model {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  active: boolean;
}