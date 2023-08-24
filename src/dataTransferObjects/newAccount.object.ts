import { User } from '../entity';

export type NewAccount = {
  capital: number;
  user: User;
  currencyId: string;
};
