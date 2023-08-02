import { repositories } from '../repositories';
import { TransactionRepository } from '../repositories/transaction.repository';

export class TransactionService {
  private transactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
}

export const transactionService = new TransactionService(repositories.transactionRepository);
