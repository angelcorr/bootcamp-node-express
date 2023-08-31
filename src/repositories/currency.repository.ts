import { DataSourceFunction } from '../../database/repository';
import { Currency } from '../entity';
import IRepository from './repository.interface';

export class CurrencyRepository implements IRepository<Currency, Currency> {
  public add = async (currencyData: Currency): Promise<Currency> => {
    const currencyCreated = DataSourceFunction(Currency).create(currencyData);

    const currency = await DataSourceFunction(Currency).save(currencyCreated);
    return currency as Currency;
  };

  public getByCode = async (code: string): Promise<Currency> => {
    const currency = await DataSourceFunction(Currency).findOneBy({ code });
    if (!currency) throw new Error(`Code not found: ${code}`);

    return currency as Currency;
  };

  public getCurrencyById = async (id: number): Promise<Currency> => {
    const found = await DataSourceFunction(Currency).findOneBy({ id });
    if (!found) throw new Error(`Id not found: ${id}`);

    return found as Currency;
  };

  public getAll = async (): Promise<Currency[]> => {
    const allCurrencies = await DataSourceFunction(Currency).find();

    return allCurrencies as Currency[];
  };
}

export const currencyRepository = new CurrencyRepository();
