import { z } from 'zod';

export type NewTransaction = {
  sourceAccountId: string;
  deliverAccountId: string;
  time: Date;
  description: string;
  amount: number;
  currencyId: string;
  exchangeDate: Date;
};

export const newTransactionSchema = z.object({
  sourceAccountId: z.string(),
  deliverAccountId: z.string(),
  time: z.date(),
  description: z.string(),
  amount: z.number(),
  currencyId: z.string(),
  exchangeDate: z.date(),
});
