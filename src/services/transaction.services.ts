import IService from '../interfaces/service.interface';
import { Transaction, accountTransactionType } from '../entity';
import { repositories } from '../repositories';
import { NewTransaction } from '../dataTransferObjects/newTransaction.object';
import { TransactionRepository } from '../repositories/transaction.repository';
import { AccountService, accountService } from './account.services';
import UnprocessableContentError from '../customErrors/unprocessableContentError';

export class TransactionService implements IService<NewTransaction, Transaction> {
  private transactionRepository;
  private accountService;

  constructor(transactionRepository: TransactionRepository, accountService: AccountService) {
    this.transactionRepository = transactionRepository;
    this.accountService = accountService;
  }

  public create = async (newTransaction: NewTransaction): Promise<Transaction> => {
    const { sourceAccountId, amount, deliverAccountId } = newTransaction;
    const sourceAccountData = await this.accountService.getOne(sourceAccountId);

    if (sourceAccountData.capital < amount) {
      throw new UnprocessableContentError('Insufficient funds');
    }

    this.accountService.updateAccount(amount, sourceAccountId, accountTransactionType.subtract);
    this.accountService.updateAccount(amount, deliverAccountId, accountTransactionType.add);

    return this.transactionRepository.add(newTransaction);
  };

  public getOne = async (id: string): Promise<Transaction> => {
    const transaction = await this.transactionRepository.getById(id);

    return transaction;
  };
}

export const transactionService = new TransactionService(repositories.transactionRepository, accountService);
