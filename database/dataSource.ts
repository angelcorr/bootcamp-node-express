import { DataSource } from 'typeorm';

import env from '../src/config';
import { Account, User, Transaction, Exchange, Currency } from '../src/entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  logging: true,
  entities: [User, Transaction, Exchange, Currency, Account],
  subscribers: [],
  migrations: ['database/migrations/*.ts'],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
