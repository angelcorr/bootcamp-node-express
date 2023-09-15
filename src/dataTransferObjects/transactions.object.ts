import { Transaction } from '../entity';

export type Transactions = {
  transactions: Transaction[];
  page: number;
  pageSize: number;
};
