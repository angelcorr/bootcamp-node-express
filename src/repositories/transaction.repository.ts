import { NewTransaction, Transaction } from '../models';
import IRepository from './repository.interface';

export class TransactionRepository implements IRepository<NewTransaction, Transaction> {
  transactions: Transaction[] = [];

  public add = (newTransaction: NewTransaction): Transaction => {
    const { sourceAccountId, deliverAccountId, time, description, amount, currencyId, exchangeDate } =
      newTransaction;
    const id = crypto.randomUUID();
    const transaction = new Transaction(
      id,
      sourceAccountId,
      deliverAccountId,
      time,
      description,
      amount,
      currencyId,
      exchangeDate,
    );
    this.transactions.push(transaction);
    return transaction;
  };

  public getById = (id: string): Transaction | null => {
    const transaction = this.transactions.find((transaction) => transaction.id === id);

    if (!transaction) return null;

    return transaction;
  };
}

export const transactionRepository = new TransactionRepository();
