import { Account, NewAccount } from '../models';
import { repositories } from '../repositories';
import { AccountRepository } from '../repositories/account.repository';

export class AccountService {
  private accountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public createAccount = (usdNewAccount: NewAccount): Account => {
    return this.accountRepository.add(usdNewAccount);
  };
}

export const accountService = new AccountService(repositories.accountRepository);
