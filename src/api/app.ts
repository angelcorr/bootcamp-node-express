import express, { json, urlencoded } from 'express';
import env from '../config';
import cookieParser from 'cookie-parser';
import errorHandler from '../middlewares/errorHandler';
import { userRouter } from './user/user.routes';
import { exchangeRouter } from './exchange/exchange.routes';
import { transactionRouter } from './transaction/transaction.routes';
import passport from 'passport';

export class App {
  private app: express.Application = express();

  constructor() {
    this.setMiddleware();
    this.setRoutes();
    this.app.use(errorHandler);
  }

  private setMiddleware() {
    this.app.use(json({ limit: '10kb' }));
    this.app.use(urlencoded({ extended: false }));
    this.app.use(cookieParser());
  }

  private setRoutes() {
    this.app.get('/healthcheck', (req, res) => {
      res.send('GET request to the homepage');
    });

    this.app.use('/users', userRouter.getRouter());
    this.app.use('/exchanges', passport.authenticate('jwt', { session: false }), exchangeRouter.getRouter());
    this.app.use(
      '/transactions',
      passport.authenticate('jwt', { session: false }),
      transactionRouter.getRouter(),
    );
  }

  public start() {
    this.app.listen(env.PORT, () => {
      console.log(`Server is listening on ${env.PORT} right now`);
      console.log(`Environment ${env.NODE_ENV}`);
    });
  }
}
