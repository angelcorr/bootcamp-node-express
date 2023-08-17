import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class Exchanges1692300629914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exchanges',
        columns: [
          {
            name: 'currency_id',
            type: 'varchar',
            isPrimary: true,
          },
          {
            name: 'date',
            type: 'date',
            isPrimary: true,
            isUnique: true,
          },
          {
            name: 'rate',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'exchanges',
      new TableForeignKey({
        columnNames: ['currency_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'currencies',
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('exchanges');
  }
}
