import { NewUser, User } from '../models';
import crypto from 'crypto';
import IRepository from './repository.interface';

export class UserRepository implements IRepository<NewUser, User> {
  users: User[] = [];

  add(newUser: NewUser): User {
    const { firstName, lastName, email, hashPassword } = newUser;
    const id = crypto.randomUUID();
    const user = new User(id, firstName, lastName, email, hashPassword);

    this.users.push(user);

    return user;
  }
}

export const userRepository = new UserRepository();
