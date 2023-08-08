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

  getUser(email: string): User | null {
    const user = this.users.find((user) => user.email === email);
    return user || null;
  }

  getUserById(id: string): User | null {
    const user = this.users.find((user) => user.id === id);
    return user || null;
  }
}

export const userRepository = new UserRepository();
