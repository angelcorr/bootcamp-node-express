import bcrypt from 'bcrypt';
import { CurrencyType, NewAccount, NewUser, SignUp, User } from '../models';
import { repositories } from '../repositories';
import constants from '../constants';
import { UserRepository } from '../repositories/user.repository';
import { CurrencyRepository } from '../repositories/currency.repository';
import { AccountRepository } from '../repositories/account.repository';

export class UserService {
  private userRepository;
  private currencyRepository;
  private accountRepository;

  constructor(
    userRepository: UserRepository,
    currencyRepository: CurrencyRepository,
    accountRepository: AccountRepository,
  ) {
    this.userRepository = userRepository;
    this.currencyRepository = currencyRepository;
    this.accountRepository = accountRepository;
  }

  async createUser(signUp: SignUp): Promise<User> {
    const { last_name, first_name, email, password } = signUp;

    const salt = await bcrypt.genSalt(constants.SALTED_ROUNDS);
    const hash_password = await bcrypt.hash(password, salt);

    const newUser = new NewUser(last_name, first_name, email, hash_password);
    const user = this.userRepository.add(newUser);

    const usdCurrency = this.currencyService.getCurrency(CurrencyType.USD);
    const eurCurrency = this.currencyService.getCurrency(CurrencyType.EUR);
    const uyuCurrency = this.currencyService.getCurrency(CurrencyType.UYU);

    const usdNewAccount = new NewAccount(constants.DEFAULT_CAPITAL_AMOUNT, user.id, usdCurrency.id);
    this.accountService.createAccount(usdNewAccount);

    const eurNewAccount = new NewAccount(constants.DEFAULT_CAPITAL_AMOUNT, user.id, eurCurrency.id);
    this.accountService.createAccount(eurNewAccount);

    const uyuNewAccount = new NewAccount(constants.DEFAULT_CAPITAL_AMOUNT, user.id, uyuCurrency.id);
    this.accountService.createAccount(uyuNewAccount);

    return user;
  }
}

export const userService: UserService = new UserService(
  repositories.userRepository,
  services.currencyService,
  services.accountService,
);
