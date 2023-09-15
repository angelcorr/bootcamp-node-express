import { Transaction } from '../entity';

export type TransactionsDto = {
  transactions: Transaction[];
  page: number;
  pageSize: number;
};
