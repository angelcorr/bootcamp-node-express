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
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.sourceAccount)
  sourceTransaction: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.deliveryAccount)
  deliverTransaction: Transaction[];

  @ManyToOne(() => Currency, (currency) => currency.account)
  currency: string;
}

export enum accountTransactionType {
  add = 'add',
  subtract = 'subtract',
}
