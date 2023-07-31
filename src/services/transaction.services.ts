import { TransactionRepository, transactionRepository } from '../repositories';

export class TransactionService {
  private transactionRepository;

  constructor(transactionRepository: TransactionRepository) {
    this.transactionRepository = transactionRepository;
  }
}

export const transactionService = new TransactionService(transactionRepository);
