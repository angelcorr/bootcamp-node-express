import { NextFunction, Request, Response } from 'express';
import { services } from '../../services';
import { SignUp, userSchema } from '../../models';
import { UserService } from '../../services/user.services';

export class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public signUp = async (req: Request, res: Response, next: NextFunction) => {
    const { last_name, first_name, email, password } = req.body;
    const signUp = new SignUp(last_name, first_name, email, password);

    const validateUserData = userSchema.safeParse(signUp);
    if (!validateUserData.success) {
      next(validateUserData.error);
      return;
    }

    const newUser = await this.userService.createUser(signUp);
    res.status(200).send(newUser);
  };
}

export const userController = new UserController(services.userService);
