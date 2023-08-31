import { EntityTarget, ObjectLiteral } from 'typeorm';
import { AppDataSource } from '../dataSource';

export const DataSourceFunction = (entity: EntityTarget<ObjectLiteral>) =>
  AppDataSource.getRepository(entity);
