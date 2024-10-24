import { Model, } from './model';

export interface Permission extends Model {
  codeName: string;
  name: string;
  description?: string;
}