import IRepository from './repository.interface';
import { Account, User } from '../entity';
import { NewUserDto } from '../dataTransferObjects/newUser.dto';
import { UserWithoutHashDto } from '../dataTransferObjects/userWithoutHas.dto';
import { DataSourceFunction } from '../../database/repository';
import BadRequestError from '../customErrors/badRequestError';
import NotFoundError from '../customErrors/notFoundError';

export class UserRepository implements IRepository<NewUserDto, User> {
  public add = async (newUser: NewUserDto): Promise<User> => {
    const { firstName, lastName, email, hashPassword } = newUser;
    const getUsers = await DataSourceFunction(User).find();
    const findEmailMatches = getUsers.find((user) => user.email === email.toLowerCase());
    if (findEmailMatches) {
      throw new BadRequestError('Bad request');
    }

    const userCreated = DataSourceFunction(User).create({
      firstName,
      lastName,
      email,
      hashPassword,
    });

    const user = await DataSourceFunction(User).save(userCreated);

    return user;
  };

  public getUser = async (email: string): Promise<User> => {
    const user = await DataSourceFunction(User).findOne({ where: { email } });
    if (!user) throw new NotFoundError('Not found');

    return user;
  };

  public getUserById = async (id: string): Promise<UserWithoutHashDto> => {
    const user = await DataSourceFunction(User).findOneBy({ id });
    if (!user) throw new NotFoundError('Not found');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { hashPassword, ...userData } = user;
    return userData;
  };

  public getList = async (id: string): Promise<Account[]> => {
    const userAccounts = await DataSourceFunction(User).find({
      where: { id },
      relations: { accounts: true },
      take: 1,
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { accounts, ...userData } = userAccounts[0];
    return accounts;
  };
}

export const userRepository = new UserRepository();
