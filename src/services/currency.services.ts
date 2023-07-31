import { CurrencyRepository, currencyRepository } from '../repositories';

export class CurrencyService {
  private currencyRepository;

  constructor(currencyRepository: CurrencyRepository) {
    this.currencyRepository = currencyRepository;
  }
}

export const currencyService = new CurrencyService(currencyRepository);
