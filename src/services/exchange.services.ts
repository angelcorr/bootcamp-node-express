import { NewExchanges } from '../dataTransferObjects/newExchanges.object';
import { Exchange } from '../models';
import { repositories } from '../repositories';
import { ExchangeRepository } from '../repositories/exchange.repository';

export class ExchangeService {
  private exchangeRepository;

  constructor(exchangeRepository: ExchangeRepository) {
    this.exchangeRepository = exchangeRepository;
  }

  public getAll = async (): Promise<Exchange[]> => {
    return this.exchangeRepository.getAll();
  };

  public update = (data: NewExchanges) => {
    this.exchangeRepository.update(data);
  };
}

export const exchangeService = new ExchangeService(repositories.exchangeRepository);
