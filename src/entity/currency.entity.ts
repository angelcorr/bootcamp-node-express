import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';
import { Exchange } from './exchange.entity';

@Entity('currencies')
export class Currency {
  @PrimaryColumn()
  public id: string;

  @Column()
  public type: string;

  @Column()
  public code: string;

  @OneToMany(() => Account, (account) => account.currency_)
  account_: string;

  @OneToMany(() => Exchange, (exchanges) => exchanges.currency_)
  exchange_: string;
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  UYU = 'UYU',
}
