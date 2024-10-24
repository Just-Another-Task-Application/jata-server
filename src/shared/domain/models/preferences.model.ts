import { Model, } from './model';

import { Theme, } from '../enums/theme.enum';

export interface Preferences extends Model {
  language: string;
  theme: Theme;
}