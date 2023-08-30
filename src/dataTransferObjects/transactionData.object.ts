import { Account, Exchange } from '../entity';

export type TransactionData = {
  sourceAccountData: Account;
  deliveryAccountData: Account;
  description: string;
  amount: number;
  sourceExchangeDate: Exchange;
  deliverExchangeDate: Exchange;
  sourceCurrencyId: Exchange;
  deliveryCurrencyId: Exchange;
};
