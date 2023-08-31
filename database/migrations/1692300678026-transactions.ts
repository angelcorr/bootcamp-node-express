import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from 'typeorm';

export class Transactions1692300678026 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'sourceAccountId',
            type: 'uuid',
          },
          {
            name: 'deliverAccountId',
            type: 'uuid',
          },
          {
            name: 'time',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'description',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'decimal',
          },
          {
            name: 'sourceCurrencyId',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'deliverCurrencyId',
            type: 'integer',
            isNullable: true,
          },
          {
            name: 'sourceExchangeDate',
            type: 'date',
            isNullable: true,
          },
          {
            name: 'deliverExchangeDate',
            type: 'date',
            isNullable: true,
          },
        ],
      }),
      true,
    );

    await queryRunner.createIndex(
      'transactions',
      new TableIndex({
        name: 'transactionIndex',
        columnNames: ['id'],
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['sourceAccountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accounts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['deliverAccountId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'accounts',
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['sourceExchangeDate', 'sourceCurrencyId'],
        referencedColumnNames: ['date', 'currencyId'],
        referencedTableName: 'exchanges',
      }),
    );

    await queryRunner.createForeignKey(
      'transactions',
      new TableForeignKey({
        columnNames: ['deliverExchangeDate', 'deliverCurrencyId'],
        referencedColumnNames: ['date', 'currencyId'],
        referencedTableName: 'exchanges',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
