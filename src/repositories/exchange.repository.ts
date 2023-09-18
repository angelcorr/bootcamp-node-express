import { DataSourceFunction } from '../../database/repository';
import NotFoundError from '../customErrors/notFoundError';
import { NewExchangeDto } from '../dataTransferObjects/newExchange.dto';
import { Exchange } from '../entity';
import IRepository from './repository.interface';

export class ExchangeRepository implements IRepository<NewExchangeDto, Exchange> {
  private repository = DataSourceFunction(Exchange);

  public add = async (exchangeData: NewExchangeDto): Promise<Exchange> => {
    const exchangeCreated = this.repository.create({
      currency: exchangeData.currency,
      date: exchangeData.date,
      rate: exchangeData.rate,
    });

    return this.repository.save(exchangeCreated);
  };

  public getAll = async (): Promise<Exchange[]> => this.repository.find();

  public getOne = async (currencyId: number): Promise<Exchange> => {
    const getExchange = await this.repository.findOne({
      where: { currencyId },
      order: { date: 'DESC' },
    });

    if (!getExchange) throw new NotFoundError(`Exchange not found`);

    return getExchange;
  };
}

export const exchangeRepository = new ExchangeRepository();
