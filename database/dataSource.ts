import { DataSource } from 'typeorm';

import env from '../src/config';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: env.POSTGRES_HOST,
  port: 5432,
  username: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
  database: env.POSTGRES_DB,
  synchronize: true,
  logging: true,
  entities: [],
  subscribers: [],
  migrations: ['database/migrations/*.ts'],
});
