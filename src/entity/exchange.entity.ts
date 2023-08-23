import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Currency } from './currency.entity';
import { Transaction } from './transaction.entity';

@Entity('exchanges')
export class Exchange {
  @PrimaryColumn({ name: 'currency_id' })
  public currencyId: string;

  @PrimaryColumn()
  public date: Date;

  @Column()
  public rate: number;

  @ManyToOne(() => Currency, (currency) => currency.exchange_)
  currency_: string;

  @OneToMany(() => Transaction, (transaction) => transaction.exchange)
  transactions: Transaction[];
}
