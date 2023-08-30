import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { Currency } from './currency.entity';
import { Transaction } from './transaction.entity';

@Entity('exchanges')
export class Exchange {
  @PrimaryColumn()
  public date: Date;

  @Column()
  public rate: number;

  @PrimaryColumn()
  public currencyId: number;

  @ManyToOne(() => Currency, (currency) => currency.exchanges)
  @JoinColumn({ name: 'currencyId' })
  currency: Currency;

  @OneToMany(() => Transaction, (transaction) => transaction.sourceExchange, { cascade: true })
  transactionSource: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.deliverExchange, { cascade: true })
  transactionDeliver: Transaction[];
}
