import { 
  Column,
  Entity, 
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Permission, } from '@shared/domain/models/permission.model';

@Entity({
  name: 'permissions',
})
export class PermissionEntity implements Permission {
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
    length: 250,
    nullable: true,
  })
  description?: string;

  @CreateDateColumn()
  createdAt?: string | undefined;

  @UpdateDateColumn()
  updatedAt?: string | undefined;
}