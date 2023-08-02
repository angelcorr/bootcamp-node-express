import { repositories } from '../repositories';
import { CurrencyRepository } from '../repositories/currency.repository';

export class CurrencyService {
  private currencyRepository;

  constructor(currencyRepository: CurrencyRepository) {
    this.currencyRepository = currencyRepository;
  }
}

export const currencyService = new CurrencyService(repositories.currencyRepository);
