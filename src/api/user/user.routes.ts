import express from 'express';
import { UserController, userController } from './user.controller';
import asyncHandler from '../../middlewares/asyncErrorHandler';
import validationBodyHandler from '../../middlewares/validationBodyHandler';
import { userSchema } from '../../models';

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
      validationBodyHandler(userSchema),
      asyncHandler(this.userController.signUp),
    );
  }
}

export const userRouter = new UserRoutes(userController);
