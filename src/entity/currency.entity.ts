import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';
import { Exchange } from './exchange.entity';

@Entity('currencies')
export class Currency {
  @PrimaryGeneratedColumn('increment')
  public id: number;

  @Column()
  public type: string;

  @Column()
  public code: string;

  @OneToMany(() => Account, (account) => account.currency, { cascade: true })
  accounts: Account[];

  @OneToMany(() => Exchange, (exchanges) => exchanges.currency, { cascade: true })
  exchanges: Exchange[];
}

export enum CurrencyType {
  USD = 'USD',
  EUR = 'EUR',
  UYU = 'UYU',
}
