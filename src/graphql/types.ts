import { TransactionService } from '../services/transaction.service';
import { UserService } from '../services/user.service';
import { AccountService } from '../services/account.service';
import { CurrencyService } from '../services/currency.service';
import { ExchangeService } from '../services/exchange.service';

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

export type GetUserArgs = {
  id: string;
};

export type Context = {
  transactionService: TransactionService;
  userService: UserService;
  accountService: AccountService;
  currencyService: CurrencyService;
  exchangeService: ExchangeService;
};
