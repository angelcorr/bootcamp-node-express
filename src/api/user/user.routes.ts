import express from 'express';
import { UserController, userController } from './user.controller';
import asyncHandler from '../../middlewares/asyncErrorHandler';
import passport from '../../middlewares/passport';
import validationBodyHandler from '../../middlewares/validationBodyHandler';
import { signUpSchema } from '../../models';
import { loginSchema } from '../../models/login.model';

class UserRoutes {
  private userController;
  private userRouter;

  constructor(userController: UserController) {
    this.userController = userController;
    this.userRouter = express.Router();
    this.setRoutes();
  }

  public getRouter(): express.Router {
    return this.userRouter;
  }

  private setRoutes() {
    this.userRouter.post(
      '/sign-up',
      validationBodyHandler(signUpSchema),
      asyncHandler(this.userController.signUp),
    );

    this.userRouter.post(
      '/login',
      validationBodyHandler(loginSchema),
      passport.authenticate('local', { session: false }),
      asyncHandler(this.userController.login),
    );

    this.userRouter.get(
      '/:id/accounts',
      passport.authenticate('jwt', { session: false }),
      asyncHandler(this.userController.getUserAccount),
    );
  }
}

export const userRouter = new UserRoutes(userController);
