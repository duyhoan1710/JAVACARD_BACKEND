import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from './base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'full_name', nullable: true })
  fullName?: string;

  @Column('varchar', { name: 'email' })
  email: string;

  @Column('varchar', { name: 'password' })
  password: string;
}
