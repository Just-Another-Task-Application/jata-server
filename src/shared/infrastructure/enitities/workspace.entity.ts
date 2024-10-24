import { 
  Column,
  Entity, 
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

import type { User, } from '@shared/domain/models/user.model';
import type { Workspace, } from '@shared/domain/models/workspace.model';

import { UserEntity } from './user.entity';

@Entity({
  name: 'workspaces',
})
export class WorkspaceEntity implements Workspace {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 80,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 60,
    unique: true,
  })
  codeName: string;

  @Column({
    type: 'varchar',
    length: 500,
  })
  description: string;

  @Column({
    type: 'bool',
    default: false,
  })
  public: boolean;

  @ManyToMany(() => UserEntity)
  @JoinTable()
  members: Array<User>;

  @ManyToOne(() => UserEntity, (user) => user.workspaces)
  owner: User;

  @CreateDateColumn()
  createdAt?: string;
  
  @UpdateDateColumn()
  updatedAt?: string;
}