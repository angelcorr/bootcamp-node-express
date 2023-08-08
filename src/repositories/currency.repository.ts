import { Currency, CurrencyType } from '../models';
import IRepository from './repository.interface';

export class CurrencyRepository implements IRepository<Currency, Currency> {
  currencies: Currency[] = this.currencySeed();

  currencySeed() {
    const usdType = 'United States dollar';
    const usdCode = CurrencyType.USD;
    const usd = new Currency(1, usdType, usdCode);

    const eurType = 'Euro';
    const eurCode = CurrencyType.EUR;
    const eur = new Currency(2, eurType, eurCode);

    const uyuType = 'Uruguayan Peso';
    const uyuCode = CurrencyType.UYU;
    const uyu = new Currency(3, uyuType, uyuCode);
    return [usd, eur, uyu];
  }

  add(currency: Currency): Currency {
    this.currencies.push(currency);
    return currency;
  }

  getByCode(code: string): Currency {
    const found = this.currencies.find((currency) => currency.code === code);
    if (!found) throw new Error(`Code not found: ${code}`);

    return found;
  }

  getCurrencyById(id: number): Currency {
    const found = this.currencies.find((currency) => currency.id === id);
    if (!found) throw new Error(`Id not found: ${id}`);

    return found;
  }
}

export const currencyRepository = new CurrencyRepository();
