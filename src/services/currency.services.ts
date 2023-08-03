import { Currency } from '../models';
import { repositories } from '../repositories';
import { CurrencyRepository } from '../repositories/currency.repository';

export class CurrencyService {
  private currencyRepository;

  constructor(currencyRepository: CurrencyRepository) {
    this.currencyRepository = currencyRepository;
  }

  public getCurrency = (code: string): Currency => {
    return this.currencyRepository.getByCode(code);
  };
}

export const currencyService = new CurrencyService(repositories.currencyRepository);
