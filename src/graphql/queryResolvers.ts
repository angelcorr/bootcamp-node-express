import { Context, GetTransactionsArgs, GetUserArgs } from './types';

export const transactions = async (parent: undefined, args: GetTransactionsArgs, contextValue: Context) => {
  const page = args.page ?? 1;
  const pageSize = args.pageSize ?? 10;
  const dateFrom = args.dateFrom ? new Date(args.dateFrom) : undefined;
  const dateTo = args.dateTo ? new Date(args.dateTo) : undefined;
  const sortBy = (args.sortBy ?? 'id') as string;
  const sortOrder = (args.sortOrder ?? 'DESC') as 'DESC' | 'ASC';
  const accountId = args.accountId as string | undefined;
  const userId = args.userId as string | undefined;

  const { transactions } = await contextValue.transactionService.getTransactions({
    page,
    pageSize,
    userId,
    dateFrom,
    dateTo,
    accountId,
    sortBy,
    sortOrder,
    graphql: true,
  });

  return transactions;
};

export const user = async (parent: undefined, args: GetUserArgs, contextValue: Context) =>
  contextValue.userService.getById(args.id);
