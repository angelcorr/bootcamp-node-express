import { Currency } from '../models';
import { repositories } from '../repositories';
import { CurrencyRepository } from '../repositories/currency.repository';
import IService from '../interfaces/service.interface';

export class CurrencyService implements IService<Currency, Currency> {
  private currencyRepository;

  constructor(currencyRepository: CurrencyRepository) {
    this.currencyRepository = currencyRepository;
  }

  public getByCode = (code: string): Currency => {
    return this.currencyRepository.getByCode(code);
  };

  public create = async (currency: Currency): Promise<Currency> => {
    return await this.currencyRepository.add(currency);
  };

  public getOne = (id: string): Currency => {
    return this.currencyRepository.getCurrencyById(id);
  };

  public getAll = (): Currency[] => {
    return this.currencyRepository.getAll();
  };
}

export const currencyService = new CurrencyService(repositories.currencyRepository);
