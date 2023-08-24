import bcrypt from 'bcrypt';
import { Account, CurrencyType, User } from '../entity';
import constants from '../constants';
import { repositories } from '../repositories';
import { currencyService, CurrencyService } from './currency.services';
import { accountService, AccountService } from './account.services';
import { UserRepository } from '../repositories/user.repository';
import IService from '../interfaces/service.interface';
import { SignUp } from '../dataTransferObjects/signUp.object';
import NotFoundError from '../customErrors/notFoundError';
import { AppDataSource } from '../../database/dataSource';
import { UserWithoutHash } from '../dataTransferObjects/userWithoutHas.object';

export class UserService implements IService<SignUp, User> {
  private currencyService;
  private accountService;
  private userRepository;

  constructor(
    currencyService: CurrencyService,
    accountService: AccountService,
    userRepository: UserRepository,
  ) {
    this.currencyService = currencyService;
    this.accountService = accountService;
    this.userRepository = userRepository;
  }

  public create = async (signUp: SignUp): Promise<User> => {
    const { lastName, firstName, email, password } = signUp;
    const salt = await bcrypt.genSalt(constants.SALTED_ROUNDS);
    const hashPassword = await bcrypt.hash(password, salt);

    const id = crypto.randomUUID();
    const newUser = { id, lastName, firstName, email, hashPassword };
    const user = await this.userRepository.add(newUser);

    const usdCurrency = await this.currencyService.getOne(CurrencyType.USD);
    const eurCurrency = await this.currencyService.getOne(CurrencyType.EUR);
    const uyuCurrency = await this.currencyService.getOne(CurrencyType.UYU);

    const usdNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      user,
      currency: usdCurrency,
    };
    await this.accountService.create(usdNewAccount);

    const eurNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      user,
      currency: eurCurrency,
    };
    await this.accountService.create(eurNewAccount);

    const uyuNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      user,
      currency: uyuCurrency,
    };
    await this.accountService.create(uyuNewAccount);

    return user;
  };

  public getOne = async (email: string): Promise<User> => {
    const user = await AppDataSource.getRepository(User).findOneBy({ email });
    if (!user) {
      throw new NotFoundError(`Not found: ${email}`);
    }

    return user;
  };

  public getById = async (id: string): Promise<UserWithoutHash> => {
    return await this.userRepository.getUserById(id);
  };

  public getUserAccounts = async (user: User): Promise<Account[]> => {
    const accounts = await this.accountService.getList(user);
    return accounts;
  };
}

export const userService: UserService = new UserService(
  currencyService,
  accountService,
  repositories.userRepository,
);
