import { repositories } from '../repositories';
import { AccountRepository } from '../repositories/account.repository';

export class AccountService {
  private accountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }
}

export const accountService = new AccountService(repositories.accountRepository);
