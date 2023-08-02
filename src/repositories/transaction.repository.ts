import { Transaction } from '../models';
import Repository from './repository';

export class TransactionRepository implements Repository<Transaction> {
  transactions: Transaction[] = [];

  add(transaction: Transaction) {
    this.transactions.push(transaction);
  }
}

export const transactionRepository = new TransactionRepository();
