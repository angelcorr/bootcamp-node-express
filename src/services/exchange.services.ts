import { ExchangeRepository, exchangeRepository } from '../repositories';

export class ExchangeService {
  private exchangeRepository;

  constructor(exchangeRepository: ExchangeRepository) {
    this.exchangeRepository = exchangeRepository;
  }
}

export const exchangeService = new ExchangeService(exchangeRepository);
