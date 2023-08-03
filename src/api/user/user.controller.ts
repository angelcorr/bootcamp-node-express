import { Request, Response } from 'express';
import { services } from '../../services';
import { UserService } from '../../services/user.services';

export class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public signUp = async (req: Request, res: Response) => {
    const { lastName, firstName, email, password } = req.body;
    const signUp = { lastName, firstName, email, password };

    const newUser = await this.userService.createUser(signUp);
    res.status(200).send(newUser);
  };
}

export const userController = new UserController(services.userService);
