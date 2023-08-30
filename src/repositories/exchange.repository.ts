import { DataSourceFunction } from '../../database/repository';
import NotFoundError from '../customErrors/notFoundError';
import { NewExchanges } from '../dataTransferObjects/newExchanges.object';
import { Currency, Exchange } from '../entity';
import IRepository from './repository.interface';

export class ExchangeRepository implements IRepository<NewExchanges, Exchange> {
  public add = async (exchangeData: NewExchanges): Promise<Exchange> => {
    const exchangeCreated = DataSourceFunction(Exchange).create({
      currency: exchangeData.currency,
      date: exchangeData.date,
      rate: exchangeData.rate,
    });

    const exchange = await DataSourceFunction(Exchange).save(exchangeCreated);

    return exchange as Exchange;
  };

  public getAll = async (): Promise<Exchange[]> => {
    const exchanges = await DataSourceFunction(Exchange).find();
    return exchanges as Exchange[];
  };

  public getOne = async (currency: Currency): Promise<Exchange> => {
    const getExchange = await DataSourceFunction(Exchange).find({
      where: { currency },
      order: { date: 'DESC' },
    });

    if (!getExchange) throw new NotFoundError(`Exchange not found`);

    return getExchange[0] as Exchange;
  };
}

export const exchangeRepository = new ExchangeRepository();
