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

  public getOne = (id: string): Account => {
    return this.accountRepository.getOne(id);
  };

  public create = async (newAccount: NewAccount): Promise<Account> => {
    return await this.accountRepository.add(newAccount);
  };

  public getList = (userId: string): Account[] => {
    return this.accountRepository.getUserAccount(userId);
  };

  public updateAccount = (amount: number, id: string, type: string) => {
    const { capital } = this.getOne(id);

    let newCapital;
    if (type === 'add') {
      newCapital = capital + amount;
    } else if (type === 'subtract') {
      newCapital = capital - amount;
    } else {
      throw new Error(`Unsupported type: ${type}`);
    }

    this.accountRepository.updateCapital(newCapital, id);
  };
}

export const accountService = new AccountService(repositories.accountRepository);
