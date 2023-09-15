import { Currency } from '../entity';

export type NewExchangesDto = {
  currency: Currency;
  date: Date;
  rate: number;
};
