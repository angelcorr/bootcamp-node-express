import { userRepository } from './user.repository';
import { accountRepository } from './account.repository';
import { transactionRepository } from './transaction.repository';
import { currencyRepository } from './currency.repository';
import { exchangeRepository } from './exchange.repository';

export const repositories = {
  userRepository,
  accountRepository,
  transactionRepository,
  currencyRepository,
  exchangeRepository,
};
