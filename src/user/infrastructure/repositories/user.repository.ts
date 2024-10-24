import { DataSource, } from 'typeorm';

import { inject, injectable, } from '@ioc/container';

import type { User, } from '@shared/domain/models/user.model';
import { UserEntity, } from '@shared/infrastructure/enitities/user.entity';
import type { DatabaseProvider, } from '@shared/domain/providers/database.provider';

import { UserRepository, } from '@user/domain/repositories/user';

@injectable()
export class UserRepositoryImplementation implements UserRepository {
  constructor(
    @inject('providers:database') private readonly database: DatabaseProvider<DataSource>,
  ) {}

  async findById(userId: string): Promise<User | null> {
    const user = await this.database.datasource
      .getRepository(UserEntity)
      .findOne({
        relations: {
          profile: true,
          addresses: true,
        },
        where: {
          id: userId,
        },
      });
    
    return user;
  }

  async findByUsername(username: string): Promise<User | null> {
    throw new Error('Not implemented');
  }

  async findByEmailOrUsername(email: string, username?: string): Promise<User | null> {
    const user = await this.database.datasource
      .getRepository(UserEntity)
      .findOne({
        where: [
          { email, },
          { username, },
        ],
      });
    
    return user;
  }

  async findAll(): Promise<Array<User>> {
    const users = await this.database.datasource
      .getRepository(UserEntity)
      .find({
        relations: {
          profile: true,
          addresses: true,
          workspaces: true,
          permissions: true,
          groups: true,
        },
        order: {
          name: 'ASC',
        },
      });
    return users;
  }

  async create(user: User): Promise<User> {
    const newUser = await this.database.datasource
      .getRepository(UserEntity)
      .save(user);
    return newUser;
  }

  async update(user: User): Promise<boolean> {
    const updatedUser = await this.database.datasource
      .getRepository(UserEntity)
      .update(user.id, user);

    if (!updatedUser || updatedUser?.affected! < 1) return false;
    return true;
  }

  async inactive(userId: string): Promise<boolean> {
    throw new Error('Method not implemented.');
  }
}