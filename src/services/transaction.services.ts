import IService from '../interfaces/service.interface';
import { Transaction, accountTransactionType } from '../entity';
import { repositories } from '../repositories';
import { NewTransaction } from '../dataTransferObjects/newTransaction.object';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AccountService, accountService } from './account.services';
import UnprocessableContentError from '../customErrors/unprocessableContentError';
import { ExchangeService, exchangeService } from './exchange.services';

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
    const { sourceAccountId, amount, deliverAccountId, currencyId, description, exchangeDate } =
      newTransaction;
    const sourceAccountData = await this.accountService.getOne(sourceAccountId);
    const deliveryAccountData = await this.accountService.getOne(deliverAccountId);
    const exchange = await this.exchangeService.getExchange(exchangeDate, currencyId);

    if (sourceAccountData.capital < amount) {
      throw new UnprocessableContentError('Insufficient funds');
    }

    await this.accountService.updateAccount(amount, sourceAccountId, accountTransactionType.subtract);
    await this.accountService.updateAccount(amount, deliverAccountId, accountTransactionType.add);

    return this.transactionRepository.add({
      exchange,
      sourceAccountData,
      deliveryAccountData,
      description,
      amount,
    });
  };

  public getOne = async (id: string): Promise<Transaction> => {
    const transaction = await this.transactionRepository.getById(id);

    return transaction;
  };
}

export const transactionService = new TransactionService(
  repositories.transactionRepository,
  accountService,
  exchangeService,
);
