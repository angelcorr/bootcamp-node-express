import { Exchange } from '../models';
import IRepository from './repository.interface';

export class ExchangeRepository implements IRepository<Exchange, Exchange> {
  exchanges: Exchange[] = this.exchangeSeed();

  exchangeSeed() {
    const first = new Exchange(1, new Date(), 0.543);
    const second = new Exchange(3, new Date(), 12);
    const third = new Exchange(3, new Date(), 11.5);

    return [first, second, third];
  }

  public add = (exchange: Exchange) => {
    this.exchanges.push(exchange);
    return exchange;
  };

  public getAll = (): Exchange[] => {
    return this.exchanges;
  };
}

export const exchangeRepository = new ExchangeRepository();
