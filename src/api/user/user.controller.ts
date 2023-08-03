import { Request, Response } from 'express';
import { services } from '../../services';
import { SignUp } from '../../models';
import { UserService } from '../../services/user.services';

export class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public signUp = async (req: Request, res: Response) => {
    const { last_name, first_name, email, password } = req.body;
    const signUp = new SignUp(last_name, first_name, email, password);

    const newUser = await this.userService.createUser(signUp);
    res.status(200).send(newUser);
  };
}

export const userController = new UserController(services.userService);
