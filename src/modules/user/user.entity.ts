import { PaymentHistoryEntity } from './../taxHistory/entity/paymentHistory.entity';
import { TaxEntity } from './../tax/tax.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { BaseEntity } from '../../common/entities/base.entity';
import { TaxHistoryEntity } from '../taxHistory/entity/taxHistory.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { name: 'id' })
  id: number;

  @Column('varchar', { name: 'full_name' })
  fullName: string;

  @Column('varchar', { name: 'card_id' })
  cardId: string;

  @Column('datetime', { name: 'birthday' })
  birthday: Date;

  @Column('int', { name: 'sex' })
  sex: number;

  @Column('varchar', { name: 'avatar_image' })
  avatarImage: string;

  @Column('varchar', { name: 'finger_print_image' })
  fingerPrintImage: string;

  @Column('varchar', { name: 'national' })
  national: string;

  @Column('varchar', { name: 'original' })
  original: string;

  @Column('varchar', { name: 'address' })
  address: string;

  @Column('int', { name: 'amount', nullable: true })
  amount: number;

  @Column('int', { name: 'debt', nullable: true })
  debt: number;

  @Column('varchar', { name: 'personal_identification' })
  personalIdentification: string;

  @Column('datetime', { name: 'release_date' })
  releaseDate: Date;

  @Column('datetime', { name: 'expired_date' })
  expiredDate: Date;

  @Column('longtext', { name: 'public_key' })
  publicKey: string;

  @Column('boolean', { name: 'auto_pay' })
  autoPay: boolean;

  @OneToMany(() => TaxEntity, (tax) => tax.user)
  tax: TaxEntity[];

  @OneToMany(() => TaxHistoryEntity, (taxHistory) => taxHistory.user)
  taxHistory: TaxHistoryEntity[];

  @OneToMany(
    () => PaymentHistoryEntity,
    (paymentHistory) => paymentHistory.user,
  )
  paymentHistory: PaymentHistoryEntity[];
}
