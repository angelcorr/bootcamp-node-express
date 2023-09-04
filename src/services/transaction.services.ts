import IService from '../interfaces/service.interface';
import { Transaction, accountTransactionType } from '../entity';
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
    let newAmount: number;
    const { sourceAccountId, amount, deliverAccountId, description } = newTransaction;
    const sourceAccountData = await this.accountService.getOne(sourceAccountId);
    const deliveryAccountData = await this.accountService.getOne(deliverAccountId);
    const sourceExchangeData = await this.exchangeService.getExchange(sourceAccountData.currency.id);
    const deliverExchangeData = await this.exchangeService.getExchange(deliveryAccountData.currency.id);
    newAmount = amount;

    if (sourceAccountData.currency.id !== deliveryAccountData.currency.id) {
      const dailyExchange = +sourceExchangeData.rate / +deliverExchangeData.rate;
      newAmount = Number((+amount * dailyExchange).toFixed(3));
    }

    if (sourceAccountData.capital < amount) {
      throw new UnprocessableContentError('Insufficient funds');
    }

    const deliveryAccount = await this.accountService.updateAccount(
      newAmount,
      deliverAccountId,
      accountTransactionType.add,
    );
    const sourceAccount = await this.accountService.updateAccount(
      amount,
      sourceAccountId,
      accountTransactionType.subtract,
    );

    return this.transactionRepository.add({
      sourceAccountData: sourceAccount,
      deliveryAccountData: deliveryAccount,
      description,
      amount,
      sourceExchangeData,
      deliverExchangeData,
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
