import crypto from 'crypto';
import { User } from '../models';
import IRepository from './repository.interface';
import { NewUser } from '../dataTransferObjects/newUser.object';
import { UserWithoutHash } from '../dataTransferObjects/userWithoutHas.object';

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

  getUserById(id: string): UserWithoutHash | null {
    const user = this.users.find((user) => user.id === id);
    if (!user) return null;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashPassword, ...userData } = user;
    return userData;
  }
}

export const userRepository = new UserRepository();
