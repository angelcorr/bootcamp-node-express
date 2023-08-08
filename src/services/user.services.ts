import bcrypt from 'bcrypt';
import { Account, CurrencyType, SignUp, User } from '../models';
import { repositories } from '../repositories';
import constants from '../constants';
import { UserRepository } from '../repositories/user.repository';
import { currencyService, CurrencyService } from './currency.services';
import { accountService, AccountService } from './account.services';
import IService from './service.interface';

export class UserService implements IService<User> {
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

  public createUser = async (signUp: SignUp): Promise<User> => {
    const { lastName, firstName, email, password } = signUp;

    const salt = await bcrypt.genSalt(constants.SALTED_ROUNDS);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = { lastName, firstName, email, hashPassword };
    const user = this.userRepository.add(newUser);

    const usdCurrency = this.currencyService.get(CurrencyType.USD);
    const eurCurrency = this.currencyService.get(CurrencyType.EUR);
    const uyuCurrency = this.currencyService.get(CurrencyType.UYU);

    const usdNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      userId: user.id,
      currencyId: usdCurrency.id,
    };
    this.accountService.createAccount(usdNewAccount);

    const eurNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      userId: user.id,
      currencyId: eurCurrency.id,
    };
    this.accountService.createAccount(eurNewAccount);

    const uyuNewAccount = {
      capital: constants.DEFAULT_CAPITAL_AMOUNT,
      userId: user.id,
      currencyId: uyuCurrency.id,
    };
    this.accountService.createAccount(uyuNewAccount);

    return user;
  };

  public get = (email: string): User | null => {
    return this.userRepository.getUser(email);
  };

  public getUserAccounts = (userId: string): Account[] => {
    return this.accountService.getAccounts(userId);
  };
}

export const userService: UserService = new UserService(
  repositories.userRepository,
  currencyService,
  accountService,
);
