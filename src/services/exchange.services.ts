import { repositories } from '../repositories';
import { ExchangeRepository } from '../repositories/exchange.repository';

export class ExchangeService {
  private exchangeRepository;

  constructor(exchangeRepository: ExchangeRepository) {
    this.exchangeRepository = exchangeRepository;
  }
}

export const exchangeService = new ExchangeService(repositories.exchangeRepository);
