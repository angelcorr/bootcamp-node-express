import { Account } from '../models';
import Repository from './repository';

export class AccountRepository implements Repository<Account> {
  accounts: Account[] = [];

  add(account: Account) {
    this.accounts.push(account);
  }
}

export const accountRepository = new AccountRepository();
