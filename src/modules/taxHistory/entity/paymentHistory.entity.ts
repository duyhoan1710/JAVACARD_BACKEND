import { UserEntity } from '../../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { BaseEntity } from '../../../common/entities/base.entity';

@Entity({ name: 'tax' })
export class PaymentHistoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('int', { name: 'user_id' })
  userId: number;

  @Column('int', { name: 'status' })
  status: boolean;

  @Column('varchar', { name: 'message' })
  message: string;

  @Column('int', { name: 'total_tax' })
  totalTax: number;

  @ManyToOne(() => UserEntity, (user) => user.tax)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: UserEntity;
}
