import IService from '../interfaces/service.interface';
import { Transaction } from '../models';
import { NewTransaction } from '../dataTransferObjects/newTransaction.object';
import { repositories } from '../repositories';
import { TransactionRepository } from '../repositories/transaction.repository';

export class TransactionService implements IService<NewTransaction, Transaction> {
  private transactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
  public create = async (newTransaction: NewTransaction): Promise<Transaction> => {
    return this.transactionRepository.add(newTransaction);
  };

  getOne = (id: string): Transaction | null => {
    return this.transactionRepository.getById(id);
  };
}

export const transactionService = new TransactionService(repositories.transactionRepository);
