export default interface IService<T> {
  get(identifier: string): T | null;
}
