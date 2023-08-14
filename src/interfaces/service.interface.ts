export default interface IService<T1, T2> {
  getOne(identifier: string): T2 | null;
  create(model: T1): Promise<T2>;
}
