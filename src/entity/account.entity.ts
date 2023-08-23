import { Entity, Column, ManyToOne, OneToMany, PrimaryColumn, BaseEntity } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { Currency } from './currency.entity';

@Entity('accounts')
export class Account extends BaseEntity {
  @PrimaryColumn({ type: 'uuid' })
  public id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public capital: number;

  @ManyToOne(() => User, (user) => user.accounts)
  user_: string;

  @OneToMany(() => Transaction, (transaction) => transaction.source_account_)
  transactions: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.delivery_account_)
  transactionsTwo: Transaction[];

  @ManyToOne(() => Currency, (currency) => currency.account_)
  currency_: string;
}

export enum accountTransactionType {
  add = 'add',
  subtract = 'subtract',
}
