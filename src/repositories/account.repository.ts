import { Account } from '../entity';
import IRepository from './repository.interface';
import { NewAccount } from '../dataTransferObjects/newAccount.object';
import NotFoundError from '../customErrors/notFoundError';
import { DataSourceFunction } from '../../database/repository';

export class AccountRepository implements IRepository<NewAccount, Account> {
  async add(newAccount: NewAccount): Promise<Account> {
    const { capital, user, currency } = newAccount;
    const accountCreated = DataSourceFunction(Account).create({
      capital,
      user,
      currency,
    });
    const account = await DataSourceFunction(Account).save(accountCreated);
    return account as Account;
  }

  async getOne(id: string): Promise<Account> {
    const oneAccount = await DataSourceFunction(Account).findOne({
      where: { id },
      relations: {
        currency: true,
      },
    });
    if (!oneAccount) throw new NotFoundError(`Id not found: ${id}`);
    return oneAccount as Account;
  }

  async updateCapital(newCapital: number, id: string): Promise<Account> {
    const account = await DataSourceFunction(Account).findOneBy({ id });
    if (!account) throw new NotFoundError(`Id not found: ${id}`);
    account.capital = newCapital;
    await DataSourceFunction(Account).save(account);

    return account as Account;
  }
}

export const accountRepository = new AccountRepository();
