import { Account, NewAccount } from '../models';
import IService from './service.interface';

export default interface IAccount extends IService<NewAccount, Account> {
  getList(identifier: string): Account[];
}
