import { MigrationInterface, QueryRunner } from 'typeorm';

export class CurrenciesSeeds1692724042097 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`INSERT INTO currencies (id, type, code) VALUES('1', 'Uruguayan Peso', 'UYU')`);
    await queryRunner.query(
      `INSERT INTO currencies (id, type, code) VALUES('2', 'United States dollar', 'USD')`,
    );
    await queryRunner.query(`INSERT INTO currencies (id, type, code) VALUES('3', 'Euro', 'EUR')`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM currencies`);
  }
}
