import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';
import { Exchange } from './exchange.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  time: Date;

  @Column()
  description: string;

  @Column()
  sourceCurrencyId: number;

  @Column()
  deliverCurrencyId: number;

  @Column()
  sourceExchangeDate: Date;

  @Column()
  deliverExchangeDate: Date;

  @Column('decimal')
  amount: number;

  @ManyToOne(() => Account, (account) => account.sourceTransaction)
  sourceAccount: Account;

  @ManyToOne(() => Account, (account) => account.deliverTransaction)
  deliverAccount: Account;

  @ManyToOne(() => Exchange, (exchange) => exchange.transactionSource)
  @JoinColumn({ name: 'sourceCurrencyId', referencedColumnName: 'currencyId' })
  @JoinColumn({ name: 'sourceExchangeDate', referencedColumnName: 'date' })
  sourceExchange: Exchange;

  @ManyToOne(() => Exchange, (exchange) => exchange.transactionDeliver)
  @JoinColumn({ name: 'deliverCurrencyId', referencedColumnName: 'currencyId' })
  @JoinColumn({ name: 'deliverExchangeDate', referencedColumnName: 'date' })
  deliverExchange: Exchange;
}
