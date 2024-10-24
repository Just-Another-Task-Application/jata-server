import { Model, } from './model';
import { User, } from './user.model';
import { AddressType, } from '../enums/address-type.enum';

export interface Address extends Model {
  formatted?: string;
  streetAddress: string;
  locality: string;
  region: string;
  postalCode: string;
  country: string;
  type?: AddressType;
  default?: boolean;
  user: User;
}