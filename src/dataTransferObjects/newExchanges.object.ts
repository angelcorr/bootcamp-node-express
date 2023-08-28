import { Currency } from '../entity';

export type NewExchanges = {
  currencyId: Currency;
  date: Date;
  rate: number;
};
