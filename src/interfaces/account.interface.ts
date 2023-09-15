import { NewAccountDto } from '../dataTransferObjects/newAccount.dto';
import { Account, User } from '../entity';
import IService from './service.interface';

export default interface IAccount extends IService<NewAccountDto, Account> {
  getList(identifier: User): Promise<Account[]>;
}
