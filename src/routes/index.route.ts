import { Router } from 'express';
import IndexController from '@controllers/index.controller';
import { Routes } from '@/typings/routes';

function home(): Routes {
  const path = '/';
  const router = Router();
  const indexController = IndexController();
  router.get(`${path}`, indexController.home);
  return {
    path,
    router,
  } as const;
}

export default home;
