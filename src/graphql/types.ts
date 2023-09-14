import { TransactionService } from '../services/transaction.services';
import { UserService } from '../services/user.services';
import { AccountService } from '../services/account.services';
import { CurrencyService } from '../services/currency.services';
import { ExchangeService } from '../services/exchange.services';

export type GetTransactionsArgs = {
  page: number;
  pageSize: number;
  userId: string | undefined;
  dateFrom: Date | undefined;
  dateTo: Date | undefined;
  accountId: string | undefined;
  sortBy: string;
  sortOrder: 'ASC' | 'DESC';
};

export type CreateTransactionArgs = {
  sourceAccountId: string;
  deliverAccountId: string;
  amount: number;
  description: string;
};

export type Context = {
  transactionService: TransactionService;
  userService: UserService;
  accountService: AccountService;
  currencyService: CurrencyService;
  exchangeService: ExchangeService;
};
