import { UserEntity } from 'entities/user.entity';
import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
