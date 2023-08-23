import { Account } from '../entity';
import { AccountRepository, accountRepository } from '../repositories/account.repository';
import { NewAccount } from '../dataTransferObjects/newAccount.object';
import IAccount from '../interfaces/account.interface';

export class AccountService implements IAccount {
  private accountRepository;
  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public getOne = async (id: string): Promise<Account> => {
    const account = await this.accountRepository.getOne(id);
    return account;
  };

  public create = async (newAccount: NewAccount): Promise<Account> => {
    const account = await this.accountRepository.add(newAccount);
    return account;
  };

  public getList = async (userId: string): Promise<Account[]> => {
    const accounts = await this.accountRepository.getUserAccounts(userId);
    return accounts;
  };

  public updateAccount = async (amount: number, id: string, type: string) => {
    const { capital } = await this.getOne(id);

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

export const accountService = new AccountService(accountRepository);
