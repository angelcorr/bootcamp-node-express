import { EntityTarget, ObjectLiteral } from 'typeorm';
import { AppDataSource } from '../dataSource';

export const DataSourceFunction = <Entity extends ObjectLiteral>(target: EntityTarget<Entity>) =>
  AppDataSource.getRepository(target);
