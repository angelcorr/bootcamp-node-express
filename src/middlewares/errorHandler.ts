import { Response, Request, NextFunction } from 'express';
import NotFoundError from '../customErrors/notFoundError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, req: Request, response: Response, next: NextFunction) => {
  if (err instanceof NotFoundError) {
    response.status(404).send({ error: err.serializeErrors() });
    return;
  }

  response.status(500).send({ error: [{ message: 'Internal server error' }] });
};

export default errorHandler;
