import { Currency, User } from '../entity';

export type NewAccountDto = {
  capital: number;
  user: User;
  currency: Currency;
};
