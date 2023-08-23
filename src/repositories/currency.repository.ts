import { AppDataSource } from '../../database/dataSource';
import { Currency } from '../entity';
import IRepository from './repository.interface';

export class CurrencyRepository implements IRepository<Currency, Currency> {
  public add = async (currencyData: Currency): Promise<Currency> => {
    const currencyCreated = AppDataSource.getRepository(Currency).create(currencyData);

    const currency = await AppDataSource.getRepository(Currency).save(currencyCreated);
    return currency;
  };

  public getByCode = async (code: string): Promise<Currency> => {
    const currency = await AppDataSource.getRepository(Currency).findOneBy({ code });
    if (!currency) throw new Error(`Code not found: ${code}`);

    return currency;
  };

  public getCurrencyById = async (id: string): Promise<Currency> => {
    const found = await AppDataSource.getRepository(Currency).findOneBy({ id });
    if (!found) throw new Error(`Id not found: ${id}`);

    return found;
  };

  public getAll = async (): Promise<Currency[]> => {
    const allCurrencies = await AppDataSource.getRepository(Currency).find();

    return allCurrencies;
  };
}

export const currencyRepository = new CurrencyRepository();
