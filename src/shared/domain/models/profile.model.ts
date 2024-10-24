import { Model, } from './model';

export interface Profile extends Model {
  biography?: string;
  maritalStatus?: string;
  nationalId: string;
}