import { AppDataSource } from '../../database/dataSource';
import { NewExchanges } from '../dataTransferObjects/newExchanges.object';
import { Exchange } from '../entity';
import IRepository from './repository.interface';

export class ExchangeRepository implements IRepository<NewExchanges, Exchange> {
  public add = async (exchangeData: NewExchanges): Promise<Exchange> => {
    const exchangeCreated = AppDataSource.getRepository(Exchange).create({
      currencyId: exchangeData.currencyId,
      date: exchangeData.date,
      rate: exchangeData.rate,
    });

    const exchange = await AppDataSource.getRepository(Exchange).save(exchangeCreated);

    return exchange;
  };

  public getAll = async (): Promise<Exchange[]> => {
    return await AppDataSource.getRepository(Exchange).find();
  };
}

export const exchangeRepository = new ExchangeRepository();
