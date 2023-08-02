import express from 'express';
import { UserController, userController } from './user.controller';
import asyncHandler from '../../middlewares/asyncErrorHandler';

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
      asyncHandler((req, res, next) => this.userController.signUp(req, res, next)),
    );
  }
}

export const userRouter = new UserRoutes(userController);