import { NextFunction, Request, Response } from 'express';
import { ApiError } from '../utils/api.error';
import { AnyZodObject } from 'zod';

export class ValidationMiddleware {
  static readonly validateRequest = <T extends AnyZodObject>(schema: T) => {
    return (req: Request, res: Response, next: NextFunction) => {
      schema
        .parseAsync({ ...req.query, ...req.params, ...req.body})
        .then(() => {
          return next(); 
        })
        .catch((error) => {
          ApiError.appError(error, req, res, next);
        });
    };
  };
}
