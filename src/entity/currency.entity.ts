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

  @OneToMany(() => Account, (account) => account.currency)
  account: Account[];

  @OneToMany(() => Exchange, (exchanges) => exchanges.currency)
  exchange: Exchange;
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  UYU = 'UYU',
}