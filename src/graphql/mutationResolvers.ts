import { Context, CreateTransactionArgs } from './types';

export const transaction = async (parent: undefined, args: CreateTransactionArgs, contextValue: Context) => {
  const sourceAccountId = args.sourceAccountId;
  const deliverAccountId = args.deliverAccountId;
  const amount = args.amount;
  const description = args.description;

  const transaction = await contextValue.transactionService.create({
    sourceAccountId,
    deliverAccountId,
    amount,
    description,
  });

  return transaction;
};
