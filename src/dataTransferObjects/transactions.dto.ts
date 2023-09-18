import { Transaction } from '../entity';
import { Pagination } from './pagination.dto';

export type TransactionsDto = Pagination & {
  transactions: Transaction[];
};
