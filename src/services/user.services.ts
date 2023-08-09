import bcrypt from 'bcrypt';
import { Account, CurrencyType, User, UserWithoutHash } from '../models';
import { repositories } from '../repositories';
import constants from '../constants';
import { UserRepository } from '../repositories/user.repository';
import { currencyService, CurrencyService } from './currency.services';
import { accountService, AccountService } from './account.services';
import IService from '../interfaces/service.interface';
import { SignUp } from '../dataTransferObjects/signUp.object';

export class UserService implements IService<SignUp, User> {
  private userRepository;
  private currencyService;
  private accountService;

  constructor(
    userRepository: UserRepository,
    currencyService: CurrencyService,
    accountService: AccountService,
  ) {
    this.userRepository = userRepository;
    this.currencyService = currencyService;
    this.accountService = accountService;
  }

  public create = async (signUp: SignUp): Promise<User> => {
    const { lastName, firstName, email, password } = signUp;

    const salt = await bcrypt.genSalt(constants.SALTED_ROUNDS);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = { lastName, firstName, email, hashPassword };
    const user = this.userRepository.add(newUser);

    const usdCurrency = this.currencyService.getByCode(CurrencyType.USD);
    const eurCurrency = this.currencyService.getByCode(CurrencyType.EUR);
    const uyuCurrency = this.currencyService.getByCode(CurrencyType.UYU);

    const usdNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      userId: user.id,
      currencyId: usdCurrency.id,
    };
    this.accountService.create(usdNewAccount);

    const eurNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      userId: user.id,
      currencyId: eurCurrency.id,
    };
    this.accountService.create(eurNewAccount);

    const uyuNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      userId: user.id,
      currencyId: uyuCurrency.id,
    };
    this.accountService.create(uyuNewAccount);

    return user;
  };

  public getOne = (email: string): User | null => {
    return this.userRepository.getUser(email);
  };

  public getById = (id: string): UserWithoutHash | null => {
    return this.userRepository.getUserById(id);
  };

  public getUserAccounts = (userId: string): Account[] => {
    return this.accountService.getList(userId);
  };

  public getAll = (): User[] => {
    return this.userRepository.getAll();
  };
}

export const userService: UserService = new UserService(
  repositories.userRepository,
  currencyService,
  accountService,
);
