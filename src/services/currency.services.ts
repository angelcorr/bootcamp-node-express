import { Currency } from '../models';
import { repositories } from '../repositories';
import { CurrencyRepository } from '../repositories/currency.repository';
import IService from './service.interface';

export class CurrencyService implements IService<Currency> {
  private currencyRepository;

  constructor(currencyRepository: CurrencyRepository) {
    this.currencyRepository = currencyRepository;
  }

  public get = (code: string): Currency => {
    return this.currencyRepository.getByCode(code);
  };
}

export const currencyService = new CurrencyService(repositories.currencyRepository);
