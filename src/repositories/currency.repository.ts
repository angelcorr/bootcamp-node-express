import { Currency } from '../models';
import Repository from './repository';

export class CurrencyRepository implements Repository<Currency> {
  currencies: Currency[] = [];

  add(currency: Currency) {
    this.currencies.push(currency);
  }
}

export const currencyRepository = new CurrencyRepository();
