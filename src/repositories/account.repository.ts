import { Account, NewAccount } from '../models';
import crypto from 'crypto';
import IRepository from './repository.interface';

export class AccountRepository implements IRepository<NewAccount, Account> {
  accounts: Account[] = [];

  add(newAccount: NewAccount): Account {
    const { capital, user_id, currency_id } = newAccount;
    const id = crypto.randomUUID();
    const account = new Account(id, capital, user_id, currency_id);

    this.accounts.push(account);

    return account;
  }
}

export const accountRepository = new AccountRepository();
