import { NextFunction, Request, Response } from 'express';

function IndexController() {
  const home = (req: Request, res: Response, next: NextFunction) => {
    try {
      return res.status(200).json({
        love: true,
        message: 'You & Me',
      });
    } catch (error) {
      next(error);
    }
  };
  return {
    home,
  };
}

export default IndexController;
