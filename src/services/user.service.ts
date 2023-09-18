import bcrypt from 'bcrypt';
import { Account, CurrencyType, User } from '../entity';
import constants from '../constants';
import { repositories } from '../repositories';
import { currencyService, CurrencyService } from './currency.service';
import { accountService, AccountService } from './account.service';
import { UserRepository } from '../repositories/user.repository';
import IService from '../interfaces/service.interface';
import { SignUpDto } from '../dataTransferObjects/signUp.dto';
import { UserWithoutHashDto } from '../dataTransferObjects/userWithoutHas.dto';

export class UserService implements IService<SignUpDto, User> {
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

  public create = async (signUp: SignUpDto): Promise<User> => {
    const { lastName, firstName, email, password } = signUp;
    const salt = await bcrypt.genSalt(constants.SALTED_ROUNDS);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = { lastName, firstName, email, hashPassword };
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

  public getOne = async (email: string): Promise<User> => this.userRepository.getUser(email);

  public getById = async (id: string): Promise<UserWithoutHashDto> => this.userRepository.getUserById(id);

  public getUserAccounts = async (id: string): Promise<Account[]> => this.userRepository.getList(id);
}

export const userService: UserService = new UserService(
  currencyService,
  accountService,
  repositories.userRepository,
);
