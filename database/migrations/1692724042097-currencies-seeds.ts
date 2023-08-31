import { MigrationInterface, QueryRunner } from 'typeorm';

export class CurrenciesSeeds1692724042097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO currencies (type, code) VALUES('Uruguayan Peso', 'UYU')`);
    await queryRunner.query(`INSERT INTO currencies (type, code) VALUES('United States dollar', 'USD')`);
    await queryRunner.query(`INSERT INTO currencies (type, code) VALUES('Euro', 'EUR')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM currencies`);
  }
}
