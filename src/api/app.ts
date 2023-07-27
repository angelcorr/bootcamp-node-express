import express, { json, urlencoded } from 'express';
import env from '../config';
import errorHandler from '../middlewares/errorHandler';

export class App {
  private app: express.Application = express();

  constructor() {
    this.setMiddleware();
    this.setRoutes();
  }

  private setMiddleware() {
    this.app.use(json({ limit: '10kb' }));
    this.app.use(urlencoded({ extended: false }));
    this.app.use('*', errorHandler);
  }

  private setRoutes() {
    this.app.get('/healthcheck', (req, res) => {
      res.send('GET request to the homepage');
    });
  }

  public start() {
    this.app.listen(env.PORT, () => {
      console.log(`Server is listening on ${env.PORT} right now`);
      console.log(`Environment ${env.NODE_ENV}`);
    });
  }
}
