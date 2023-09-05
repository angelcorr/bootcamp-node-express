import IService from '../interfaces/service.interface';
import { Transaction } from '../entity';
import { repositories } from '../repositories';
import { NewTransaction } from '../dataTransferObjects/newTransaction.object';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AccountService, accountService } from './account.services';
import UnprocessableContentError from '../customErrors/unprocessableContentError';
import { ExchangeService, exchangeService } from './exchange.services';
import { TransactionRequest } from '../dataTransferObjects/transactionRequest.object';
import { Transactions } from '../dataTransferObjects/transactions.object';

export class TransactionService implements IService<NewTransaction, Transaction> {
  private transactionRepository;
  private accountService;
  private exchangeService;

  constructor(
    transactionRepository: TransactionRepository,
    accountService: AccountService,
    exchangeService: ExchangeService,
  ) {
    this.transactionRepository = transactionRepository;
    this.accountService = accountService;
    this.exchangeService = exchangeService;
  }

  public create = async (newTransaction: NewTransaction): Promise<Transaction> => {
    const { sourceAccountId, amount, deliverAccountId, description } = newTransaction;
    const sourceAccount = await this.accountService.getOne(sourceAccountId);
    const deliverAccount = await this.accountService.getOne(deliverAccountId);
    const sourceExchange = await this.exchangeService.getExchange(sourceAccount.currency.id);
    const deliverExchange = await this.exchangeService.getExchange(deliverAccount.currency.id);

    if (sourceAccount.capital < amount) {
      throw new UnprocessableContentError('Insufficient funds');
    }

    return this.transactionRepository.add({
      sourceAccount,
      deliverAccount,
      description,
      amount,
      sourceExchange,
      deliverExchange,
    });
  };

  public getOne = async (id: string): Promise<Transaction> => {
    const transaction = await this.transactionRepository.getById(id);

    return transaction;
  };

  public getTransactions = async (transactionRequest: TransactionRequest): Promise<Transactions> => {
    const transactions = await this.transactionRepository.getTransactions(transactionRequest);
    return transactions;
  };
}

export const transactionService = new TransactionService(
  repositories.transactionRepository,
  accountService,
  exchangeService,
);
