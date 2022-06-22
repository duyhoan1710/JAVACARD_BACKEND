import { UserEntity } from '../../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'tax_history' })
export class TaxHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'personal_income' })
  personalIncome: number;

  @Column('int', { name: 'deduction' })
  deduction: number;

  @Column('int', { name: 'insurance_deduction' })
  insuranceDeduction: number;

  @Column('int', { name: 'total_tax' })
  totalTax: number;

  @ManyToOne(() => UserEntity, (user) => user.tax)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
