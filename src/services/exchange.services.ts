import { NewExchanges } from '../dataTransferObjects/newExchanges.object';
import { Exchange } from '../entity';
import { repositories } from '../repositories';
import { ExchangeRepository } from '../repositories/exchange.repository';

export class ExchangeService {
  private exchangeRepository;

  constructor(exchangeRepository: ExchangeRepository) {
    this.exchangeRepository = exchangeRepository;
  }

  public getAll = async (): Promise<Exchange[]> => {
    return await this.exchangeRepository.getAll();
  };

  public add = async (data: NewExchanges): Promise<Exchange> => {
    return await this.exchangeRepository.add(data);
  };

  public getExchange = async (exchangeDate: Date, currencyId: number): Promise<Exchange> => {
    return await this.exchangeRepository.getOne(exchangeDate, currencyId);
  };
}

export const exchangeService = new ExchangeService(repositories.exchangeRepository);
