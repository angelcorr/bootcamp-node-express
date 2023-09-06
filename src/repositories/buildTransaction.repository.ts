import { EntityManager } from 'typeorm';
import { AppDataSource } from '../../database/dataSource';

export const buildTransaction = <T>(runInTransaction: (entityManager: EntityManager) => Promise<T>) =>
  AppDataSource.transaction(async (transactionalEntityManager) =>
    runInTransaction(transactionalEntityManager),
  );
