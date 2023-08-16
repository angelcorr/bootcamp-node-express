import { NewExchanges } from '../dataTransferObjects/newExchanges.object';
import { Exchange } from '../models';
import IRepository from './repository.interface';

export class ExchangeRepository implements IRepository<NewExchanges, Exchange> {
  exchanges: Exchange[] = [];

  public add = (data: NewExchanges): Exchange => {
    this.exchanges.push(data.eurExchange, data.usdExchange, data.uyuExchange);

    return data.uyuExchange;
  };

  public getAll = (): Exchange[] => {
    return this.exchanges;
  };
}

export const exchangeRepository = new ExchangeRepository();
