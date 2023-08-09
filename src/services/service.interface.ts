export default interface IService<T> {
  get(email: string): T | null;
  getById(identifier: number | string): T | null;
  getAll(): T[];
}
