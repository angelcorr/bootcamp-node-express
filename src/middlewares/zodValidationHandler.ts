import type { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const bodyHandlerValidation =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const userDataValidated = schema.safeParse(req.body);
    if (!userDataValidated.success) {
      next(userDataValidated.error);
      return;
    }

    next();
  };

export const queryParamsHandlerValidation =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const queryParamsValidated = schema.safeParse(req.query);
    if (!queryParamsValidated.success) {
      next(queryParamsValidated.error);
      return;
    }

    next();
  };
