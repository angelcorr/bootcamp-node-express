import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class Exchanges1692300629914 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exchanges',
        columns: [
          {
            name: 'currencyId',
            type: 'integer',
            isPrimary: true,
          },
          {
            name: 'date',
            type: 'date',
            isPrimary: true,
          },
          {
            name: 'rate',
            type: 'varchar',
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'exchanges',
      new TableIndex({
        name: 'exchangeIndex',
        columnNames: ['currencyId', 'date'],
      }),
    );

    await queryRunner.createForeignKey(
      'exchanges',
      new TableForeignKey({
        columnNames: ['currencyId'],
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
