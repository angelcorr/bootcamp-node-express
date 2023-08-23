import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { services } from '../../services';
import { UserService } from '../../services/user.services';
import { User } from '../../models';
import constants from '../../constants';
import UnauthorizedError from '../../customErrors/unauthorizedError';
import NotFoundError from '../../customErrors/notFoundError';

export class UserController {
  private userService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  public signUp = async (req: Request, res: Response) => {
    const { lastName, firstName, email, password } = req.body;
    const signUp = { lastName, firstName, email, password };

    const newUser = await this.userService.create(signUp);
    res.status(200).send(newUser);
  };

  public login = async (req: Request, res: Response) => {
    const user = req.user as User;

    const { id, email } = user;
    const token = jwt.sign({ id, email }, constants.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token);
    res.send({ token });
  };

  public getUserAccounts = async (req: Request, res: Response) => {
    const user = req.user as User;
    if (req.params.id !== user.id) {
      throw new UnauthorizedError('Invalid user');
    }

    const userAccounts = this.userService.getUserAccounts(user.id);

    res.send({ accounts: userAccounts });
  };

  public getUser = async (req: Request, res: Response) => {
    const user = await this.userService.getById(req.params.id);

    if (!user) {
      throw new NotFoundError('Not found');
    }

    res.send({ user });
  };
}

export const userController = new UserController(services.userService);
