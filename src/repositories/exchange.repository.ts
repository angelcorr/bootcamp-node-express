import { NewExchanges } from '../dataTransferObjects/newExchanges.object';
import { Exchange } from '../models';
import IRepository from './repository.interface';

export class ExchangeRepository implements IRepository<Exchange, Exchange> {
  exchanges: Exchange[] = [];

  public add = (exchange: Exchange) => {
    this.exchanges.push(exchange);
    return exchange;
  };

  public getAll = (): Exchange[] => {
    return this.exchanges;
  };

  public update = (data: NewExchanges) => {
    return this.exchanges.push(data.eurExchange, data.usdExchange, data.uyuExchange);
  };
}

export const exchangeRepository = new ExchangeRepository();
