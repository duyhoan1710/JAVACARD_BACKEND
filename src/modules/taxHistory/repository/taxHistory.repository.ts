import { TaxHistoryEntity } from '../entity/taxHistory.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(TaxHistoryEntity)
export class TaxHistoryRepository extends Repository<TaxHistoryEntity> {}
