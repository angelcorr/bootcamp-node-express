import { AppDataSource } from '../../database/dataSource';
import NotFoundError from '../customErrors/notFoundError';
import { NewTransaction } from '../dataTransferObjects/newTransaction.object';
import { Transaction } from '../entity';
import IRepository from './repository.interface';

export class TransactionRepository implements IRepository<NewTransaction, Transaction> {
  transactions: Transaction[] = [];

  public add = (newTransaction: NewTransaction): Promise<Transaction> => {
    const { sourceAccountId, deliverAccountId, description, amount, currencyId, exchangeDate } =
      newTransaction;
    const id = crypto.randomUUID();
    const time = new Date();
    const transactionCreated = AppDataSource.getRepository(Transaction).create({
      id,
      sourceAccountId,
      deliverAccountId,
      time,
      description,
      amount,
      currencyId,
      exchangeDate,
    });

    const transaction = AppDataSource.getRepository(Transaction).save(transactionCreated);
    return transaction;
  };

  public getById = async (id: string): Promise<Transaction> => {
    const transaction = await AppDataSource.getRepository(Transaction).findOne({ where: { id: id } });

    if (!transaction) {
      throw new NotFoundError(`Id not found: ${id}`);
    }

    return transaction;
  };
}

export const transactionRepository = new TransactionRepository();
