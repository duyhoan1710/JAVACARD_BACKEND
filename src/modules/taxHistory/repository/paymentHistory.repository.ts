import { PaymentHistoryEntity } from '../entity/paymentHistory.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(PaymentHistoryEntity)
export class PaymentHistoryRepository extends Repository<PaymentHistoryEntity> {}
