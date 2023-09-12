import express, { json, urlencoded } from 'express';
import env from '../config';
import cookieParser from 'cookie-parser';
import 'reflect-metadata';
import errorHandler from '../middlewares/errorHandler';
import { userRouter } from './user/user.routes';
import { exchangeRouter } from './exchange/exchange.routes';
import { transactionRouter } from './transaction/transaction.routes';
import passport from 'passport';
import '../integration/cronJob';
import { run } from '../graphQL';

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

    this.app.use('/api/users', userRouter.getRouter());
    this.app.use(
      '/api/exchanges',
      passport.authenticate('jwt', { session: false }),
      exchangeRouter.getRouter(),
    );
    this.app.use(
      '/api/transactions',
      passport.authenticate('jwt', { session: false }),
      transactionRouter.getRouter(),
    );
  }

  public async start() {
    const apollo = await run();
    this.app.use('/graphql', json({ limit: '10kb' }), apollo);

    this.app.listen(env.PORT, () => {
      console.log(`Server is listening on ${env.PORT} right now`);
      console.log(`Environment ${env.NODE_ENV}`);
    });
  }
}
