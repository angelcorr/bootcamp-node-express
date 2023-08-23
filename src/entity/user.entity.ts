import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid' })
  public id: string;

  @Column({ name: 'first_name' })
  public firstName: string;

  @Column({ name: 'last_name' })
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column({ name: 'hash_password' })
  public hashPassword: string;

  @OneToMany(() => Account, (account) => account.user_)
  accounts: Account;
}
