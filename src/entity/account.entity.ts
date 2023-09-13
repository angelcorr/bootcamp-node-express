import { Entity, Column, ManyToOne, OneToMany, BaseEntity, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Transaction } from './transaction.entity';
import { Currency } from './currency.entity';

@Entity('accounts')
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  public capital: number;

  @Column('uuid')
  public userId: string;

  @ManyToOne(() => User, (user) => user.accounts)
  user: User;

  @OneToMany(() => Transaction, (transaction) => transaction.sourceAccount, { cascade: true })
  sourceTransaction: Transaction[];

  @OneToMany(() => Transaction, (transaction) => transaction.deliverAccount, { cascade: true })
  deliverTransaction: Transaction[];

  @ManyToOne(() => Currency, (currency) => currency.accounts)
  currency: Currency;
}

export enum accountTransactionType {
  add = 'add',
  subtract = 'subtract',
}
