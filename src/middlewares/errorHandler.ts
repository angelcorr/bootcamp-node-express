import { Response, Request, NextFunction } from 'express';
import CustomError from '../customErrors/customError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, req: Request, response: Response, next: NextFunction) => {
  if (err instanceof CustomError) {
    response.status(err.errorCode).send({ error: err.serializeErrors() });
    return;
  }

  response.send({ error: [{ message: 'Internal server error' }] });
};

export default errorHandler;
