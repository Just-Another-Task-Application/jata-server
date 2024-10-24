import { 
  Entity, 
  Column,
  OneToOne,
  JoinTable,
  OneToMany,
  ManyToMany,
  JoinColumn,
  VirtualColumn,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Gender, } from '@shared/domain/enums/gender.enum';

import type { User, } from '@shared/domain/models/user.model';
import type { Token, } from '@shared/domain/models/token.model';
import type { Group, } from '@shared/domain/models/group.model';
import type { Profile, } from '@shared/domain/models/profile.model';
import type { Address, } from '@shared/domain/models/address.model';
import type { Permission, } from '@shared/domain/models/permission.model';

import { GroupEntity, } from './group.entity';
import { AddressEntity, } from './address.entity';
import { ProfileEntity, } from './profile.entity';
import { PermissionEntity, } from './permission.entity';
import { WorkspaceEntity } from './workspace.entity';
import { Workspace } from '@shared/domain/models/workspace.model';

@Entity({
  name: 'users',
})
export class UserEntity implements User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @VirtualColumn({
    type: 'varchar',
    query: (alias) => `SELECT CONCAT(givenName, coalesce(middleName, ''), familyName, coalesce(secondLastName, '')) FROM users WHERE id = ${alias}.id`,
  })
  name?: string;

  @Column({
    type: 'varchar',
    length: 320,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  password?: string;

  @Column({
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string;

  @Column({
    type: 'char',
    length: 15,
    unique: true,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: 80,
  })
  preferredUsername: string;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: true,
  })
  nickname?: string;

  @Column({
    type: 'varchar',
    length: 64,
  })
  givenName: string;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  middleName?: string;

  @Column({
    type: 'varchar',
    length: 80,
  })
  familyName: string;

  @Column({
    type: 'varchar',
    length: 80,
    nullable: true,
  })
  secondLastName?: string;

  @Column({
    type: 'text',
  })
  picture: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  website?: string;

  @Column({
    type: 'enum',
    enum: Gender,
    nullable: true,
  })
  gender?: Gender;

  @Column({
    type: 'date',
  })
  birthdate: Date;

  @Column({
    type: 'varchar',
    length: 64,
    nullable: true,
  })
  zoneinfo?: string;

  @Column({
    type: 'varchar',
    length: 32,
    nullable: true,
  })
  locale?: string;

  @Column({
    type: 'bool',
    default: true,
  })
  active: boolean;

  @Column({
    type: 'bool',
    default: false,
    nullable: true,
  })
  emailVerified?: boolean;

  @Column({
    type: 'bool',
    default: false,
    nullable: true,
  })
  phoneNumberVerified?: boolean;

  @Column({
    type: 'bool',
    default: false,
    nullable: true,
  })
  twoFactorEnabled?: boolean;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  twoFactorSecret?: string;

  @Column({
    type: 'timestamp',
    default: new Date(),
    nullable: true,
  })
  lastSeen?: Date;

  @OneToOne(() => ProfileEntity, { nullable: true, })
  @JoinColumn()
  profile?: Profile;

  @OneToMany(() => AddressEntity, (address) => address.user)
  addresses?: Array<Address>;

  @OneToMany(() => WorkspaceEntity, (workspace) => workspace.owner)
  workspaces?: Array<Workspace>;

  tokens: Token[];

  @ManyToMany(() => PermissionEntity)
  @JoinTable()
  permissions?: Array<Permission>;

  @ManyToMany(() => GroupEntity)
  @JoinTable()
  groups?: Array<Group>;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}