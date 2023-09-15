import { NewExchangesDto } from '../dataTransferObjects/newExchanges.dto';
import { Exchange } from '../entity';
import IService from '../interfaces/service.interface';
import { repositories } from '../repositories';
import { ExchangeRepository } from '../repositories/exchange.repository';

export class ExchangeService implements IService<Exchange, Exchange> {
  private exchangeRepository;

  constructor(exchangeRepository: ExchangeRepository) {
    this.exchangeRepository = exchangeRepository;
  }

  public getExchanges = async (): Promise<Exchange[]> => this.exchangeRepository.getAll();

  public create = async (data: NewExchangesDto): Promise<Exchange> => this.exchangeRepository.add(data);

  public getOne = async (currencyId: number): Promise<Exchange> => this.exchangeRepository.getOne(currencyId);
}

export const exchangeService = new ExchangeService(repositories.exchangeRepository);
