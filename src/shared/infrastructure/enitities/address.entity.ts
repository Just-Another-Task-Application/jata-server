import { 
  Column, 
  Entity, 
  ManyToOne, 
  CreateDateColumn, 
  UpdateDateColumn, 
  PrimaryGeneratedColumn,
} from 'typeorm';

import type { User, } from '@shared/domain/models/user.model';
import type { Address, } from '@shared/domain/models/address.model';
import { AddressType, } from '@shared/domain/enums/address-type.enum';

import { UserEntity, } from './user.entity';

@Entity({
  name: 'addresses',
})
export class AddressEntity implements Address {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
  })
  formatted?: string | undefined;

  @Column({
    type: 'varchar',
    length: 150,
  })
  streetAddress: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  locality: string;

  @Column({
    type: 'varchar',
    length: 50,
  })
  region: string;

  @Column({
    type: 'char',
    length: 20,
  })
  postalCode: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  country: string;

  @Column({
    type: 'enum',
    enum: AddressType,
    default: AddressType.HOME,
    nullable: true,
  })
  type?: AddressType;

  @Column({
    type: 'bool',
    default: false,
    nullable: true,
  })
  default?: boolean;

  @ManyToOne(() => UserEntity, (user) => user.addresses)
  user: User;

  @CreateDateColumn()
  createdAt?: string;

  @UpdateDateColumn()
  updatedAt?: string;
}