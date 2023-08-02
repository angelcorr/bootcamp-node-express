import { UserRepository, userRepository } from '../repositories';

export class UserService {
  private userRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }
}

export const userService = new UserService(userRepository);
