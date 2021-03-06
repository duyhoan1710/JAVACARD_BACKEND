import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createUserTable1642276887991 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'full_name',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'birthday',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'card_id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'identification_id',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'avatar_image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'finger_print_image',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'sex',
            type: 'int',
            length: '1',
            isNullable: true,
          },
          {
            name: 'national',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'original',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'address',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'amount',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'debt',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'personal_identification',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'release_date',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'expired_date',
            type: 'datetime',
          },
          {
            name: 'auto_pay',
            type: 'boolean',
          },
          {
            name: 'public_key',
            type: 'longtext',
          },
          {
            name: 'created_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`DROP TABLE users`);
  }
}
