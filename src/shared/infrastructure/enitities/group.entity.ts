import { 
  Entity, 
  Column,
  JoinTable,
  ManyToMany,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { Group, } from '@shared/domain/models/group.model';
import type { Permission, } from '@shared/domain/models/permission.model';

import { PermissionEntity, } from './permission.entity';

@Entity({
  name: 'groups',
})
export class GroupEntity implements Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  codeName: string;

  @Column({
    type: 'varchar',
    length: 80,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 500,
    nullable: true,
  })
  description?: string;

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions?: Array<Permission>;

  @CreateDateColumn()
  createdAt?: string | undefined;

  @UpdateDateColumn()
  updatedAt?: string | undefined;
}