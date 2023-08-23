import crypto from 'crypto';
import IRepository from './repository.interface';
import { User } from '../entity';
import { NewUser } from '../dataTransferObjects/newUser.object';
import { UserWithoutHash } from '../dataTransferObjects/userWithoutHas.object';
import { AppDataSource } from '../../database/dataSource';
import BadRequestError from '../customErrors/BadRequestError';
import NotFoundError from '../customErrors/notFoundError';

export class UserRepository implements IRepository<NewUser, User> {
  public add = async (newUser: NewUser): Promise<User> => {
    const { firstName, lastName, email, hashPassword } = newUser;
    const getUsers = await AppDataSource.getRepository(User).find();
    const findEmailMatches = getUsers.find((user) => user.email === email);
    if (findEmailMatches) {
      throw new BadRequestError('Bad request');
    }

    const id = crypto.randomUUID();
    const createUser = AppDataSource.getRepository(User).create({
      id,
      firstName,
      lastName,
      email,
      hashPassword,
    });
    const user = await AppDataSource.getRepository(User).save(createUser);

    return user;
  };

  public getUser = async (email: string): Promise<User> => {
    const user = await AppDataSource.getRepository(User).findOne({ where: { email: email } });
    if (!user) {
      throw new NotFoundError(`Email not found: ${email}`);
    }

    return user;
  };

  public getUserById = async (id: string): Promise<UserWithoutHash> => {
    const user = await AppDataSource.getRepository(User).findOneBy({ id });
    console.log('user: ', user);
    if (!user) {
      throw new NotFoundError(`Not found`);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashPassword, ...userData } = user;
    return userData;
  };
}

export const userRepository = new UserRepository();
