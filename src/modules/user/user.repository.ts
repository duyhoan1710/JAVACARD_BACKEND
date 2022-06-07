import { UserEntity } from '@src/entities/user.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
