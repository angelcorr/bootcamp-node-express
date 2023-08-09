import express, { json, urlencoded } from 'express';
import env from '../config';
import cookieParser from 'cookie-parser';
import errorHandler from '../middlewares/errorHandler';
import { userRouter } from './user/user.routes';
import { exchangeRouter } from './exchange/exchange.routes';

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
    this.app.use('/exchanges', exchangeRouter.getRouter());
  }

  public start() {
    this.app.listen(env.PORT, () => {
      console.log(`Server is listening on ${env.PORT} right now`);
      console.log(`Environment ${env.NODE_ENV}`);
    });
  }
}
