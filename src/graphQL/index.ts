import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { transactionService } from '../services/transaction.services';
import { userService } from '../services/user.services';
import { accountService } from '../services/account.services';
import { currencyService } from '../services/currency.services';
import { exchangeService } from '../services/exchange.services';
import dateScalar from './dateScalar';
import typeDefs from './typeDefs';
import { transactions, user } from './queryResolvers';
import { transaction } from './mutationResolvers';
import {
  sourceAccount,
  deliverAccount,
  sourceCurrency,
  deliverCurrency,
  sourceExchange,
  deliverExchange,
} from './transactionTypeResolvers';
import { user as accountTypeUser } from './accountTypeResolvers';

const resolvers = {
  Date: dateScalar,

  Query: {
    transactions,
    user,
  },

  Transaction: {
    sourceAccount,
    deliverAccount,
    sourceCurrency,
    deliverCurrency,
    sourceExchange,
    deliverExchange,
  },

  Account: {
    user: accountTypeUser,
  },

  Mutation: {
    transaction,
  },
};

export const run = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  console.log(`🚀 Apollo Server ready`);
  return expressMiddleware(server, {
    context: async () => ({
      dataSources: {
        transactions: transactionService,
        users: userService,
        accounts: accountService,
        currencies: currencyService,
        exchanges: exchangeService,
      },
    }),
  });
};
