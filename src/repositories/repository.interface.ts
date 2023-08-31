export default interface IRepository<T1, T2> {
  add(model: T1): Promise<T2>;
}
