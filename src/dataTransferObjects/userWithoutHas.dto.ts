import { User } from '../entity';

export type UserWithoutHashDto = Omit<User, 'hashPassword'>;
