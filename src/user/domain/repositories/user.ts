import { User, } from '@shared/domain/models/user.model';

export interface UserRepository {
  findById(userId: string): Promise<User | null>;
  findAll(): Promise<Array<User>>;
  findByUsername(username: string): Promise<User | null>;
  findByEmailOrUsername(email: string, username?: string): Promise<User | null>;
  create(user: User): Promise<User>;
  update(user: User): Promise<boolean>;
  inactive(userId: string): Promise<boolean>;
}