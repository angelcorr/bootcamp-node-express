import { User } from '../models';
import Repository from './repository';

export class UserRepository implements Repository<User> {
  users: User[] = [];

  add(user: User) {
    this.users.push(user);
  }
}

export const userRepository = new UserRepository();
