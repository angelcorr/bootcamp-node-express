import { Account, Exchange } from '../entity';

export type TransactionData = {
  sourceAccount: Account;
  deliverAccount: Account;
  description: string;
  amount: number;
  sourceExchange: Exchange;
  deliverExchange: Exchange;
};
