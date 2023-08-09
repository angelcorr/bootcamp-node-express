import IService from './service.interface';

export default interface IAccount<M1, M2> extends IService<M1, M2> {
  getList(identifier: string): M2[];
}
