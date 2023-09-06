import { Account } from '../entity';
import IRepository from './repository.interface';
import { NewAccount } from '../dataTransferObjects/newAccount.object';
import NotFoundError from '../customErrors/notFoundError';
import { DataSourceFunction } from '../../database/repository';
import { EntityManager } from 'typeorm';

export class AccountRepository implements IRepository<NewAccount, Account> {
  async add(newAccount: NewAccount): Promise<Account> {
    const { capital, user, currency } = newAccount;
    const accountCreated = DataSourceFunction(Account).create({
      capital,
      user,
      currency,
    });
    const account = await DataSourceFunction(Account).save(accountCreated);
    return account;
  }

  async getOne(id: string): Promise<Account> {
    const oneAccount = await DataSourceFunction(Account).findOne({
      where: { id },
      relations: {
        currency: true,
      },
    });
    if (!oneAccount) throw new NotFoundError(`Id not found: ${id}`);
    return oneAccount;
  }

  async updateCapital(
    newCapital: number,
    id: string,
    transactionalEntityManager: EntityManager,
  ): Promise<Account> {
    const repository = transactionalEntityManager
      ? transactionalEntityManager.getRepository(Account)
      : DataSourceFunction(Account);

    const account = await repository.findOneBy({ id });
    if (!account) throw new NotFoundError(`Id not found: ${id}`);
    account.capital = newCapital;
    await repository.save(account);

    return account;
  }
}

export const accountRepository = new AccountRepository();
