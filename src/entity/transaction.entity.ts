import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';
import { Exchange } from './exchange.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn({ type: 'uuid' })
  public id: string;

  @Column({ name: 'source_account_id' })
  private sourceAccountId: string;

  @Column({ name: 'deliver_account_id' })
  private deliverAccountId: string;

  @Column()
  private time: Date;

  @Column()
  private description: string;

  @Column('decimal')
  private amount: number;

  @Column({ name: 'currency_id' })
  private currencyId: string;

  @Column({ name: 'exchange_date', unique: false })
  private exchangeDate: Date;

  @ManyToOne(() => Account, (account) => account.transactions)
  source_account_: string;

  @ManyToOne(() => Account, (account) => account.transactionsTwo)
  delivery_account_: string;

  @ManyToOne(() => Exchange, (exchange) => exchange.currency_)
  exchange: Exchange;
}
