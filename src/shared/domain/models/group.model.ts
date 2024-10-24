import { Model, } from './model';
import { Permission, } from './permission.model';

export interface Group extends Model {
  codeName: string;
  name: string;
  description?: string;
  permissions?: Array<Permission>;
}