import { Response, Request, NextFunction } from 'express';
import NotFoundError from '../customErrors/notFoundError';
import UnprocessableContentError from '../customErrors/unprocessableContentError';
import { ZodError } from 'zod';
import UnauthorizedError from '../customErrors/unauthorizedError';
import BadRequestError from '../customErrors/BadRequestError';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('err: ', err);
  if (err instanceof NotFoundError) {
    res.status(404).send({ error: err.serializeErrors() });
    return;
  }

  if (err instanceof UnprocessableContentError) {
    res.status(422).send({ error: err.serializeErrors() });
    return;
  }

  if (err instanceof ZodError) {
    res.status(422).send({ error: 'Zod validation error', errors: err.errors });
    return;
  }

  if (err instanceof UnauthorizedError) {
    res.status(401).send({ error: err.serializeErrors() });
    return;
  }

  if (err instanceof BadRequestError) {
    res.status(400).send({ error: err.serializeErrors() });
    return;
  }

  res.status(500).send({ error: { message: 'Internal server error' }, err: err.message });
};

export default errorHandler;
