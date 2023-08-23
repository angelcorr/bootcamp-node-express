import { User } from '../entity';

export type UserWithoutHash = Omit<User, 'hashPassword'>;
