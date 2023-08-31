import { Currency, User } from '../entity';

export type NewAccount = {
  capital: number;
  user: User;
  currency: Currency;
};
