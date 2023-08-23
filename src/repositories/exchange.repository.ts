import { AppDataSource } from '../../database/dataSource';
import { NewExchanges } from '../dataTransferObjects/newExchanges.object';
import { Exchange } from '../entity';
import IRepository from './repository.interface';

export class ExchangeRepository implements IRepository<NewExchanges, Exchange> {
  public add = async (exchangeData: NewExchanges): Promise<Exchange> => {
    const { usdExchange, uyuExchange, eurExchange } = exchangeData;

    await AppDataSource.getRepository(Exchange).save(usdExchange);
    await AppDataSource.getRepository(Exchange).save(uyuExchange);
    const uyuExchangeSaved = await AppDataSource.getRepository(Exchange).save(eurExchange);

    return uyuExchangeSaved;
  };

  public getAll = async (): Promise<Exchange[]> => {
    return await AppDataSource.getRepository(Exchange).find();
  };
}

export const exchangeRepository = new ExchangeRepository();
