import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';
import { Exchange } from './exchange.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  private time: Date;

  @Column()
  private description: string;

  @Column('decimal')
  private amount: number;

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
