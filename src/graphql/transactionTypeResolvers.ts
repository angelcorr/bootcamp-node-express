import { Transaction } from '../entity';
import { Context } from './types';

export const sourceAccount = async (parent: Transaction) => {
  return parent.sourceAccount;
};

export const deliverAccount = async (parent: Transaction) => {
  return parent.deliverAccount;
};

export const sourceCurrency = async (parent: Transaction, args: unknown, contextValue: Context) => {
  return contextValue.dataSources.currencies.getOneById(parent.sourceCurrencyId);
};

export const deliverCurrency = async (parent: Transaction, args: unknown, contextValue: Context) => {
  return contextValue.dataSources.currencies.getOneById(parent.deliverCurrencyId);
};

export const sourceExchange = async (parent: Transaction, args: unknown, contextValue: Context) => {
  return contextValue.dataSources.exchanges.getExchange(parent.sourceCurrencyId);
};

export const deliverExchange = async (parent: Transaction, args: unknown, contextValue: Context) => {
  return contextValue.dataSources.exchanges.getExchange(parent.deliverCurrencyId);
};
