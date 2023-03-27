import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

const BigPromise =
  (
    func: (
      arg: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>,
      arg_: Response<any, Record<string, any>>,
      arg2: NextFunction,
    ) => unknown,
  ) =>
  (req: Request, res: Response, next: NextFunction) =>
    new Promise(resolve => resolve(func(req, res, next))).catch(next);

export default BigPromise;
