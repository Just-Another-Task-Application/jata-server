import { 
  Column,
  Entity, 
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Profile, } from '@shared/domain/models/profile.model';

@Entity({
  name: 'profiles',
})
export class ProfileEntity implements Profile {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    type: 'varchar',
    length: 1000,
    nullable: true,
  })
  biography?: string;

  @Column({
    type: 'varchar',
    length: 20,
    nullable: true,
  })
  maritalStatus?: string;

  @Column({
    type: 'varchar',
    length: 20,
  })
  nationalId: string;

  @CreateDateColumn()
  createdAt?: string;
  
  @UpdateDateColumn()
  updatedAt?: string;
}