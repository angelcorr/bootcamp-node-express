import { AccountRepository, accountRepository } from '../repositories';

export class AccountService {
  private accountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }
}

export const accountService = new AccountService(accountRepository);
