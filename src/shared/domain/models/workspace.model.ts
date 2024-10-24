import { Model, } from './model';
import { User, } from './user.model';

export interface Workspace extends Model {
  name: string;
  codeName: string;
  description: string;
  members: Array<User>;
  public: boolean;
  owner: User;
}