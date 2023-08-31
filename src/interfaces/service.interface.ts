export default interface IService<T1, T2> {
  getOne(identifier: string): Promise<T2>;
  create(model: T1): Promise<T2>;
}
