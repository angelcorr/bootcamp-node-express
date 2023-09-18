import { EntityManager } from 'typeorm';
import { Account, Exchange } from '../entity';

export type TransactionDataDto = {
  sourceAccount: Account;
  deliverAccount: Account;
  description: string;
  amount: number;
  sourceExchange: Exchange;
  deliverExchange: Exchange;
  transactionalEntityManager: EntityManager;
};
