import { Account, NewAccount } from '../models';
import crypto from 'crypto';
import IRepository from './repository.interface';

export class AccountRepository implements IRepository<NewAccount, Account> {
  accounts: Account[] = [];

  add(newAccount: NewAccount): Account {
    const { capital, userId, currencyId } = newAccount;
    const id = crypto.randomUUID();
    const account = new Account(id, capital, userId, currencyId);

    this.accounts.push(account);

    return account;
  }
}

export const accountRepository = new AccountRepository();
