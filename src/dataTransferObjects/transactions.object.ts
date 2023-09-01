import { Transaction } from 'typeorm';

export type transactionData = {
  transactions: Transaction[];
  page: number;
  pageSize: number;
};
