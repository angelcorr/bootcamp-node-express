import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { services } from '../../services';
import { UserService } from '../../services/user.services';
import { User } from '../../models';
import constants from '../../constants';

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

  public login = async (req: Request, res: Response) => {
    const user = req.user as User;

    const { id, email } = user;
    const token = jwt.sign({ id, email }, constants.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);
    res.send({ token });
  };
}

export const userController = new UserController(services.userService);
