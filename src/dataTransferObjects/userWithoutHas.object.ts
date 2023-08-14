import { User } from '../models';

export type UserWithoutHash = Omit<User, 'hashPassword'>;
