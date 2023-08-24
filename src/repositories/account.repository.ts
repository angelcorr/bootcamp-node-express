import { Account, User } from '../entity';
import crypto from 'crypto';
import IRepository from './repository.interface';
import { NewAccount } from '../dataTransferObjects/newAccount.object';
import NotFoundError from '../customErrors/notFoundError';
import { AppDataSource } from '../../database/dataSource';

export class AccountRepository implements IRepository<NewAccount, Account> {
  async add(newAccount: NewAccount): Promise<Account> {
    const { capital, user, currency } = newAccount;
    const id = crypto.randomUUID();
    const accountCreated = AppDataSource.getRepository(Account).create({
      id,
      capital,
      user,
      currency,
    });
    const account = await AppDataSource.getRepository(Account).save(accountCreated);
    return account;
  }

  async getUserAccounts(user: User): Promise<Account[]> {
    const accounts = await AppDataSource.getRepository(Account).find({
      relations: { user: true },
      where: { user: { id: user.id } },
    });
    return accounts;
  }

  async getOne(id: string): Promise<Account> {
    const oneAccount = await AppDataSource.getRepository(Account).findOneBy({ id });
    if (!oneAccount) throw new NotFoundError(`Id not found: ${id}`);
    return oneAccount;
  }

  async updateCapital(newCapital: number, id: string) {
    const account = await AppDataSource.getRepository(Account).findOneBy({ id });
    if (!account) throw new NotFoundError(`Id not found: ${id}`);
    account.capital = newCapital;
    await AppDataSource.getRepository(Account).save(account);

    return account;
  }
}

export const accountRepository = new AccountRepository();
