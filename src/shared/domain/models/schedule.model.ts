import { Model, } from './model';

export interface Schedule extends Model {
  type: 'once' | 'on';
}