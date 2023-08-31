import { Currency } from '../entity';

export type NewExchanges = {
  currency: Currency;
  date: Date;
  rate: number;
};
