import { Transaction } from 'typeorm';

export type Transactions = {
  transactions: Transaction[];
  page: number;
  pageSize: number;
};
