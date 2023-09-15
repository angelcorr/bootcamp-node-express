import { Account, accountTransactionType } from '../entity';
import { AccountRepository, accountRepository } from '../repositories/account.repository';
import { NewAccountDto } from '../dataTransferObjects/newAccount.dto';
import IService from '../interfaces/service.interface';
import { EntityManager } from 'typeorm';

export class AccountService implements IService<NewAccountDto, Account> {
  private accountRepository;
  constructor(accountRepository: AccountRepository) {
    this.accountRepository = accountRepository;
  }

  public getOne = async (id: string): Promise<Account> => {
    const account = await this.accountRepository.getOne(id);
    return account;
  };

  public create = async (newAccount: NewAccountDto): Promise<Account> => {
    const account = await this.accountRepository.add(newAccount);
    return account;
  };

  public updateAccount = async (
    amount: number,
    id: string,
    type: accountTransactionType,
    transactionalEntityManager: EntityManager,
  ): Promise<Account> => {
    const { capital } = await this.getOne(id);

    let newCapital;
    if (type === 'add') {
      newCapital = +capital + +amount;
    } else if (type === 'subtract') {
      newCapital = +capital - amount;
    } else {
      throw new Error(`Unsupported type: ${type}`);
    }

    return await this.accountRepository.updateCapital(newCapital, id, transactionalEntityManager);
  };
}

export const accountService = new AccountService(accountRepository);
