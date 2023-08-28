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

  @ManyToOne(() => Exchange, (exchange) => exchange.transactions)
  @JoinColumn({ name: 'currencyId', referencedColumnName: 'currencyId' })
  @JoinColumn({ name: 'exchangeDate', referencedColumnName: 'date' })
  exchange: Exchange;
}
