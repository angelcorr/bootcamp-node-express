import IService from './service.interface';

export default interface IAccount<NewAccount, Account> extends IService<NewAccount, Account> {
  getList(identifier: string): Account[];
}
