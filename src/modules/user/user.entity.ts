import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'full_name', nullable: true })
  fullName: string;

  @Column('varchar', { name: 'verify_code' })
  verifyCode: string;

  @Column('varchar', { name: 'card_number' })
  cardNumber: string;

  @Column('datetime', { name: 'date_of_birth', nullable: true })
  dateOfBirth: Date;

  @Column('int', { name: 'gender', nullable: true })
  gender: number;

  @Column('varchar', { name: 'image', nullable: true })
  image: string;

  @Column('varchar', { name: 'country', nullable: true })
  country: string;

  @Column('varchar', { name: 'hometown', nullable: true })
  hometown: string;

  @Column('varchar', { name: 'address', nullable: true })
  address: string;

  @Column('int', { name: 'amount', nullable: true })
  amount: number;

  @Column('int', { name: 'debt', nullable: true })
  debt: number;

  @Column('int', { name: 'personal_income', nullable: true })
  personalIncome: number;
}
