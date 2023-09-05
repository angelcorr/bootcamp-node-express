import { DataSourceFunction } from '../../database/repository';
import NotFoundError from '../customErrors/notFoundError';
import { TransactionData } from '../dataTransferObjects/transactionData.object';
import { Transactions } from '../dataTransferObjects/transactions.object';
import { Account, Transaction } from '../entity';
import IRepository from './repository.interface';
import { TransactionRequest } from '../dataTransferObjects/transactionRequest.object';
import { AppDataSource } from '../../database/dataSource';

export class TransactionRepository implements IRepository<TransactionData, Transaction> {
  public add = async (newTransaction: TransactionData): Promise<Transaction> => {
    return AppDataSource.transaction(async (transactionalEntityManager) => {
      const { sourceAccount, deliverAccount, description, amount, sourceExchange, deliverExchange } =
        newTransaction;

      const transactionRepository = transactionalEntityManager.getRepository(Transaction);
      const accountRepository = transactionalEntityManager.getRepository(Account);

      let newAmount = amount;
      if (sourceAccount.currency.id !== deliverAccount.currency.id) {
        const dailyExchange = +sourceExchange.rate / +deliverExchange.rate;
        newAmount = Number((+amount * dailyExchange).toFixed(3));
      }

      deliverAccount.capital = deliverAccount.capital + newAmount;
      await accountRepository.save(deliverAccount);

      sourceAccount.capital = sourceAccount.capital - amount;
      await accountRepository.save(sourceAccount);

      const transaction = transactionRepository.create({
        sourceAccount,
        deliverAccount,
        time: new Date(),
        description,
        amount,
        sourceExchange,
        deliverExchange,
      });
      return transactionRepository.save(transaction);
    });
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
    } as Transactions;
  };
}

export const transactionRepository = new TransactionRepository();
