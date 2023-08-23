import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Currency } from './currency.entity';
import { Transaction } from './transaction.entity';

@Entity('exchanges')
export class Exchange {
  @PrimaryColumn()
  public currencyId: string;

  @PrimaryColumn()
  public date: Date;

  @Column()
  public rate: number;

  @ManyToOne(() => Currency, (currency) => currency.exchange)
  currency: Currency;

  @OneToMany(() => Transaction, (transaction) => transaction.exchange)
  transactions: Transaction[];
}
