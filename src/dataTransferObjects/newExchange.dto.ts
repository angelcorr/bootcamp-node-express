import { Currency } from '../entity';

export type NewExchangeDto = {
  currency: Currency;
  date: Date;
  rate: number;
};
