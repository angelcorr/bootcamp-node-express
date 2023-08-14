import { Account } from '../models';
import { repositories } from '../repositories';
import { AccountRepository } from '../repositories/account.repository';
import IAccount from '../interfaces/account.interface';
import { NewAccount } from '../dataTransferObjects/newAccount.object';

export class AccountService implements IAccount {
  private accountRepository;

  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public getOne = (id: string): Account | null => {
    return this.accountRepository.getOne(id);
  };

  public create = async (newAccount: NewAccount): Promise<Account> => {
    return await this.accountRepository.add(newAccount);
  };

  public getList = (userId: string): Account[] => {
    return this.accountRepository.getUserAccount(userId);
  };
}

export const accountService = new AccountService(repositories.accountRepository);
