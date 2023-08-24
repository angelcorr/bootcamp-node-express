import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity('users')
export class User {
  @PrimaryColumn({ type: 'uuid' })
  public id: string;

  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public hashPassword: string;

  @OneToMany(() => Account, (account) => account.user)
  accounts: Account[];
}
