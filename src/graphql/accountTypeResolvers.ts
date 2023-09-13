import { Account } from '../entity';
import { Context } from './types';

export const user = async (parent: Account, args: unknown, contextValue: Context) => {
  return contextValue.dataSources.users.getById(parent.userId);
};
