import { Exchange } from '../models';
import IRepository from './repository.interface';

export class ExchangeRepository implements IRepository<Exchange, Exchange> {
  exchanges: Exchange[] = [];

  add(exchange: Exchange) {
    this.exchanges.push(exchange);
    return exchange;
  }
}

export const exchangeRepository = new ExchangeRepository();
