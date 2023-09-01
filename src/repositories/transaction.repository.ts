import { DataSourceFunction } from '../../database/repository';
import NotFoundError from '../customErrors/notFoundError';
import { TransactionData } from '../dataTransferObjects/transactionData.object';
import { transactionRequest } from '../dataTransferObjects/transactionRequest.object';
import { transactionData } from '../dataTransferObjects/transactions.object';
import { Transaction } from '../entity';
import IRepository from './repository.interface';

export class TransactionRepository implements IRepository<TransactionData, Transaction> {
  transactions: Transaction[] = [];

  public add = async (newTransaction: TransactionData): Promise<Transaction> => {
    const {
      sourceAccountData,
      deliveryAccountData,
      description,
      amount,
      sourceExchangeData,
      deliverExchangeData,
    } = newTransaction;
    const transactionCreated = DataSourceFunction(Transaction).create({
      sourceAccount: sourceAccountData,
      deliverAccount: deliveryAccountData,
      time: new Date(),
      description,
      amount,
      sourceExchangeData,
      deliverExchangeData,
    });

    const transaction = await DataSourceFunction(Transaction).save(transactionCreated);
    return transaction as Transaction;
  };

  public getById = async (id: string): Promise<Transaction> => {
    const transaction = await DataSourceFunction(Transaction).findOne({ where: { id: id } });

    if (!transaction) {
      throw new NotFoundError(`Id not found: ${id}`);
    }

    return transaction as Transaction;
  };

  public getTransactions = async (transactionRequest: transactionRequest): Promise<transactionData> => {
    const { page, pageSize, userId } = transactionRequest;
    const transactionsList = await DataSourceFunction(Transaction)
      .createQueryBuilder('transaction')
      .leftJoinAndSelect('transaction.sourceAccount', 'account')
      .where('account.userId = :userId', { userId })
      .take(pageSize)
      .skip(page * pageSize)
      .getMany();

    return {
      transactions: transactionsList,
      page: transactionRequest.page,
      pageSize: transactionRequest.pageSize,
    } as transactionData;
  };
}

export const transactionRepository = new TransactionRepository();
