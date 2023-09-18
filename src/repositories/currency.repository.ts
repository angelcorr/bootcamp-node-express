import { DataSourceFunction } from '../../database/repository';
import { Currency } from '../entity';
import IRepository from './repository.interface';

export class CurrencyRepository implements IRepository<Currency, Currency> {
  private repository = DataSourceFunction(Currency);

  public add = async (currencyData: Currency): Promise<Currency> => {
    const currencyCreated = this.repository.create(currencyData);

    return this.repository.save(currencyCreated);
  };

  public getByCode = async (code: string): Promise<Currency> => {
    const currency = await this.repository.findOneBy({ code });
    if (!currency) throw new Error(`Code not found: ${code}`);

    return currency;
  };

  public getCurrencyById = async (id: number): Promise<Currency> => {
    const found = await this.repository.findOneBy({ id });
    if (!found) throw new Error(`Id not found: ${id}`);

    return found;
  };

  public getAll = async (): Promise<Currency[]> => this.repository.find();
}

export const currencyRepository = new CurrencyRepository();
