import { Account } from '../entity';
import IRepository from './repository.interface';
import { NewAccountDto } from '../dataTransferObjects/newAccount.dto';
import NotFoundError from '../customErrors/notFoundError';
import { DataSourceFunction } from '../../database/repository';
import { EntityManager } from 'typeorm';

export class AccountRepository implements IRepository<NewAccountDto, Account> {
  private repository = DataSourceFunction(Account);

  async add(newAccount: NewAccountDto): Promise<Account> {
    const { capital, user, currency } = newAccount;
    const accountCreated = this.repository.create({
      capital,
      user,
      currency,
    });
    return this.repository.save(accountCreated);
  }

  async getOne(id: string): Promise<Account> {
    const oneAccount = await this.repository.findOne({
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
    const account = await transactionalEntityManager.getRepository(Account).findOneBy({ id });
    if (!account) throw new NotFoundError(`Id not found: ${id}`);
    account.capital = newCapital;
    await transactionalEntityManager.getRepository(Account).save(account);

    return account;
  }
}

export const accountRepository = new AccountRepository();
