import { Account } from '../models';
import crypto from 'crypto';
import IRepository from './repository.interface';
import { NewAccount } from '../dataTransferObjects/newAccount.object';
import NotFoundError from '../customErrors/notFoundError';

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
  };

  public getOne = (id: string): Account => {
    const oneAccount = this.accounts.find((account) => account.id === id);
    if (!oneAccount) throw new NotFoundError(`Id not found: ${id}`);

    return oneAccount;
  };

  public updateCapital = (newCapital: number, id: string) => {
    const account = this.accounts.find((account) => account.id === id);
    if (!account) throw new NotFoundError(`Id not found: ${id}`);

    account.capital = newCapital;
  };
}

export const accountRepository = new AccountRepository();
