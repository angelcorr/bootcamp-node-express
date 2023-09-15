/* eslint-disable @typescript-eslint/no-unused-vars */

import IService from '../interfaces/service.interface';
import { Account, Transaction, accountTransactionType } from '../entity';
import { repositories } from '../repositories';
import { NewTransactionDto } from '../dataTransferObjects/newTransaction.dto';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AccountService, accountService } from './account.service';
import UnprocessableContentError from '../customErrors/unprocessableContentError';
import { ExchangeService, exchangeService } from './exchange.service';
import { TransactionRequestDto } from '../dataTransferObjects/transactionRequest.dto';
import { TransactionsDto } from '../dataTransferObjects/transactions.dto';
import { buildTransaction } from '../repositories/buildTransaction.repository';

export class TransactionService implements IService<NewTransactionDto, Transaction> {
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

  public create = async (newTransaction: NewTransactionDto): Promise<Transaction> => {
    let newAmount: number;
    const { sourceAccountId, amount, deliverAccountId, description } = newTransaction;
    const sourceAccountData = await this.accountService.getOne(sourceAccountId);
    const deliveryAccountData = await this.accountService.getOne(deliverAccountId);
    const sourceExchangeData = await this.exchangeService.getOne(sourceAccountData.currency.id);
    const deliverExchangeData = await this.exchangeService.getOne(deliveryAccountData.currency.id);
    newAmount = amount;

    if (sourceAccountData.currency.id !== deliveryAccountData.currency.id) {
      const dailyExchange = +sourceExchangeData.rate / +deliverExchangeData.rate;
      newAmount = Number((+amount * dailyExchange).toFixed(3));
    }

    if (sourceAccountData.capital < amount) {
      throw new UnprocessableContentError('Insufficient funds');
    }

    return buildTransaction(async (transactionalEntityManager) => {
      const deliverAccount = await this.accountService.updateAccount(
        newAmount,
        deliverAccountId,
        accountTransactionType.add,
        transactionalEntityManager,
      );
      const sourceAccount = await this.accountService.updateAccount(
        amount,
        sourceAccountId,
        accountTransactionType.subtract,
        transactionalEntityManager,
      );

      return this.transactionRepository.add({
        sourceAccount,
        deliverAccount,
        description,
        amount,
        sourceExchange: sourceExchangeData,
        deliverExchange: deliverExchangeData,
        transactionalEntityManager,
      });
    });
  };

  public getOne = async (id: string): Promise<Transaction> => {
    const transaction = await this.transactionRepository.getById(id);

    return transaction;
  };

  public getTransactions = async (transactionRequest: TransactionRequestDto): Promise<TransactionsDto> => {
    const transactionsList = await this.transactionRepository.getTransactions(transactionRequest);

    if (transactionRequest.graphql) return transactionsList;

    const cleanAccount = ({ userId, ...data }: Account) => data;

    const cleanTransaction = ({
      sourceCurrencyId,
      deliverCurrencyId,
      sourceExchangeDate,
      deliverExchangeDate,
      ...data
    }: Transaction) => ({
      ...data,
      deliverAccount: cleanAccount(data.deliverAccount),
      sourceAccount: cleanAccount(data.sourceAccount),
    });
    const transactionsRest = transactionsList.transactions.map(cleanTransaction);

    const newTransactionObject = { ...transactionsList, transactions: transactionsRest };
    return newTransactionObject as TransactionsDto;
  };
}

export const transactionService = new TransactionService(
  repositories.transactionRepository,
  accountService,
  exchangeService,
);
