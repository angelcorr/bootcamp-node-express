import { NewAccount } from '../dataTransferObjects/newAccount.object';
import { Account, User } from '../entity';
import IService from './service.interface';

export default interface IAccount extends IService<NewAccount, Account> {
  getList(identifier: User): Promise<Account[]>;
}
