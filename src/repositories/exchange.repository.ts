import { Exchange } from '../models';
import Repository from './repository';

export class ExchangeRepository implements Repository<Exchange> {
  exchanges: Exchange[] = [];

  add(exchange: Exchange) {
    this.exchanges.push(exchange);
  }
}

export const exchangeRepository = new ExchangeRepository();
