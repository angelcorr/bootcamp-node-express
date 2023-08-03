import type { NextFunction, Request, Response } from 'express';
import { AnyZodObject } from 'zod';

const validationHandler = (schema: AnyZodObject) => (req: Request, res: Response, next: NextFunction) => {
  const validateUserData = schema.safeParse(req.body);
  if (!validateUserData.success) {
    next(validateUserData.error);
    return;
  }

  next();
};

export default validationHandler;
