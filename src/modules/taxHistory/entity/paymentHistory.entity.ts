import { UserEntity } from '../../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'payment_history' })
export class PaymentHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'identification_id' })
  identificationId: string;

  @Column('int', { name: 'status' })
  status: boolean;

  @Column('varchar', { name: 'message' })
  message: string;

  @Column('int', { name: 'total_tax' })
  totalTax: number;

  @ManyToOne(() => UserEntity, (user) => user.tax)
  @JoinColumn({ name: 'identification_id', referencedColumnName: 'id' })
  user: UserEntity;
}
