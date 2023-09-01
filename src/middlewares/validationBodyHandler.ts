import type { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

export const validationBodyHandler =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const validateUserData = schema.safeParse(req.body);
    if (!validateUserData.success) {
      next(validateUserData.error);
      return;
    }

    next();
  };

export const validationHeaderHandler =
  (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
    const validateQueryParams = schema.safeParse(req.query);
    if (!validateQueryParams.success) {
      next(validateQueryParams.error);
      return;
    }

    next();
  };
