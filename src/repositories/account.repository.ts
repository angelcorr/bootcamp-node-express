import { Account } from '../models';
import crypto from 'crypto';
import IRepository from './repository.interface';
import { NewAccount } from '../dataTransferObjects/newAccount.object';

export class AccountRepository implements IRepository<NewAccount, Account> {
  accounts: Account[] = [];

  public add = (newAccount: NewAccount): Account => {
    const { capital, userId, currencyId } = newAccount;
    const id = crypto.randomUUID();
    const account = new Account(id, capital, userId, currencyId);

    this.accounts.push(account);

    return account;
  };

  public getUserAccount = (userId: string): Account[] => {
    const accounts = this.accounts.filter((account) => account.userId === userId);
    return accounts;
  }

  getOne(id: string): Account | null {
    const oneAccount = this.accounts.find((account) => account.id === id);
    return oneAccount || null;
  }
}

export const accountRepository = new AccountRepository();
