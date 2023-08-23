import { NewAccount } from '../dataTransferObjects/newAccount.object';
import { Account } from '../entity';
import IService from './service.interface';

export default interface IAccount extends IService<NewAccount, Account> {
  getList(identifier: string): Promise<Account[]>;
}
