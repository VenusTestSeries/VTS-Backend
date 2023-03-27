import app from '@/app';
import { logger } from '@utils/logger';
import { NODE_ENV, PORT } from '@config';
import validateEnv from '@utils/validateEnv';
validateEnv();
import express from 'express';
import connectDatabase from '@/databases';
// ROUTES
import HomeRoute from '@routes/index.route';
import userRoutes from '@/routes/auth/user.route';
import imageRoutes from '@/routes/upload/image.route';
import seriesRoutes from '@/routes/series/series.route';
import sectionRoutes from '@/routes/series/section.route';
import googleAuthRoutes from '@routes/auth/google.route';
import facebookAuthRoutes from '@routes/auth/facebook.route';

const info = {
  '/': '/',
  v1: '/v1',
  get auth() {
    return `${this.v1}/auth`;
  },
  get image() {
    return `${this.v1}/uploads`;
  },
};
const env = NODE_ENV || 'development';

// HOME ROUTES

app.use(info['/'], HomeRoute);
app.use(info['v1'], HomeRoute);
// USER & AUTH ROUTES
app.use(info['auth'], userRoutes);
app.use(info['auth'], googleAuthRoutes);
app.use(info['auth'], facebookAuthRoutes);
// TEST SERIES ROUTES
app.use(info['v1'], seriesRoutes);
app.use(info['v1'], sectionRoutes);
// IMAGE ROUTES
app.use(info.image, imageRoutes);
app.use(info.image, express.static('dist/uploads/images'));
app.use(info.image, express.static('dist/uploads/users'));
app.use(info.image, express.static('dist/uploads/series'));
// Database Connection
connectDatabase();
// LISTEN PORT
app.listen(PORT, () => {
  logger.info(`=================================`);
  logger.info(`=================================`);
  logger.warn(`→ App is running in ${env} mode`);
  logger.info(`→ App listening on the port ${PORT}`);
  logger.info(`→ URL: http://localhost:${PORT}`);
  logger.info(`=================================`);
  logger.info(`=================================`);
});
