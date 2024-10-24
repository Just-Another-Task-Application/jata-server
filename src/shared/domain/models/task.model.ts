import { Model, } from './model';
import { Note, } from './note.model';
import { User, } from './user.model';
import { Priority, } from '../enums/priority.enum';

export interface Task extends Model {
  heading: string;
  body: string;
  priority: Priority;
  closed: boolean;
  notes: Array<Note>;
  owner: User;
}