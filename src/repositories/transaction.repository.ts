import { Transaction } from '../models';
import IRepository from './repository.interface';

export class TransactionRepository implements IRepository<Transaction, Transaction> {
  transactions: Transaction[] = [];

  add(transaction: Transaction) {
    this.transactions.push(transaction);
    return transaction;
  }
}

export const transactionRepository = new TransactionRepository();
