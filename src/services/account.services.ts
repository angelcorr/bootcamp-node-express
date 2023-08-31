import { Account } from '../entity';
import { AccountRepository, accountRepository } from '../repositories/account.repository';
import { NewAccount } from '../dataTransferObjects/newAccount.object';
import IService from '../interfaces/service.interface';

export class AccountService implements IService<NewAccount, Account> {
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

  public updateAccount = async (amount: number, id: string, type: string): Promise<Account> => {
    const { capital } = await this.getOne(id);

    let newCapital;
    if (type === 'add') {
      newCapital = +capital + +amount;
    } else if (type === 'subtract') {
      newCapital = +capital - amount;
    } else {
      throw new Error(`Unsupported type: ${type}`);
    }

    return await this.accountRepository.updateCapital(newCapital, id);
  };
}

export const accountService = new AccountService(accountRepository);
