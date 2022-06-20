import { TaxEntity } from './tax.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(TaxEntity)
export class TaxRepository extends Repository<TaxEntity> {}
