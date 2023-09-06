import { DataSourceFunction } from '../../database/repository';
import NotFoundError from '../customErrors/notFoundError';
import { TransactionData } from '../dataTransferObjects/transactionData.object';
import { Transactions } from '../dataTransferObjects/transactions.object';
import { Transaction } from '../entity';
import IRepository from './repository.interface';
import { TransactionRequest } from '../dataTransferObjects/transactionRequest.object';

export class TransactionRepository implements IRepository<TransactionData, Transaction> {
  public add = async (newTransaction: TransactionData): Promise<Transaction> => {
    const {
      sourceAccount,
      deliverAccount,
      description,
      amount,
      sourceExchange,
      deliverExchange,
      transactionalEntityManager,
    } = newTransaction;

    const repository = transactionalEntityManager
      ? transactionalEntityManager.getRepository(Transaction)
      : DataSourceFunction(Transaction);
    const transactionCreated = repository.create({
      sourceAccount,
      deliverAccount,
      time: new Date(),
      description,
      amount,
      sourceExchange,
      deliverExchange,
    });

    const transaction = await repository.save(transactionCreated);
    return transaction;
  };

  public getById = async (id: string): Promise<Transaction> => {
    const transaction = await DataSourceFunction(Transaction).findOne({ where: { id: id } });

    if (!transaction) {
      throw new NotFoundError(`Id not found: ${id}`);
    }

    return transaction as Transaction;
  };

  public getTransactions = async (transactionRequest: TransactionRequest): Promise<Transactions> => {
    const { page, pageSize, userId, dateFrom, dateTo, accountId, sortBy, sortOrder } = transactionRequest;

    const query = DataSourceFunction(Transaction)
      .createQueryBuilder('transaction')
      .innerJoinAndSelect('transaction.sourceAccount', 'sourceAccount')
      .innerJoinAndSelect('transaction.deliverAccount', 'deliverAccount')
      .where('(sourceAccount.userId = :userId OR deliverAccount.userId = :userId)', { userId });

    if (accountId) {
      query.andWhere('(sourceAccount.id = :accountId OR deliverAccount.id = :accountId)', { accountId });
    }

    if (dateFrom) {
      query.andWhere('transaction.time >= :dateFrom', { dateFrom });
    }

    if (dateTo) {
      query.andWhere('transaction.time < :dateTo', { dateTo });
    }

    if (sortBy) {
      query.orderBy(`transaction.${sortBy}`, sortOrder);
    }

    const transactionsList = await query
      .take(pageSize)
      .skip((page - 1) * pageSize)
      .getMany();

    return {
      transactions: transactionsList,
      page: transactionRequest.page,
      pageSize: transactionRequest.pageSize,
    } as unknown as Transactions;
  };
}

export const transactionRepository = new TransactionRepository();
