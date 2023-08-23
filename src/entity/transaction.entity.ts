import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';
import { Exchange } from './exchange.entity';

@Entity('transactions')
export class Transaction {
  @PrimaryColumn({ type: 'uuid' })
  public id: string;

  @Column()
  private sourceAccountId: string;

  @Column()
  private deliverAccountId: string;

  @Column()
  private time: Date;

  @Column()
  private description: string;

  @Column('decimal')
  private amount: number;

  @Column()
  private currencyId: string;

  @Column({ unique: false })
  private exchangeDate: Date;

  @ManyToOne(() => Account, (account) => account.sourceTransaction)
  sourceAccount: Account;

  @ManyToOne(() => Account, (account) => account.deliverTransaction)
  deliveryAccount: Account;

  @ManyToOne(() => Exchange, (exchange) => exchange.currency)
  exchange: Exchange;
}
