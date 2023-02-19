import app from '@/app';
import { logger } from '@utils/logger';
import { NODE_ENV, PORT } from '@config';
import validateEnv from '@utils/validateEnv';

validateEnv();
const info = {
  v1: '/v1',
  get auth() {
    return `${this.v1}/auth`;
  },
  get user() {
    return `${this.v1}/user`;
  },
};
const port = PORT || 5000;
const env = NODE_ENV || 'development';
// ROUTES
import HomeRoute from '@routes/index.route';
import connectDatabase from '@/databases';
import googleAuthRoutes from '@routes/auth/google.route';
import facebookAuthRoutes from '@routes/auth/facebook.route';
import imageRoutes from '@/routes/upload/image.route';
import sectionRoutes from '@/routes/series/section.route';
import userRoutes from '@/routes/users/user.route';
const indexRoute = HomeRoute();
app.use(indexRoute.path, indexRoute.router);
app.use(info.v1, indexRoute.router);



// USER & AUTH ROUTES
app.use(info.user, userRoutes);
app.use(info.auth, googleAuthRoutes);
app.use(info.auth, facebookAuthRoutes);
// TEST SERIES ROUTES
app.use(info.v1, sectionRoutes);
// IMAGE ROUTES
app.use(info.v1, imageRoutes);
// Database Connection
connectDatabase();
// LISTEN PORT
app.listen(port, () => {
  logger.info(`=================================`);
  logger.info(`=================================`);
  logger.warn(`→ App is running in ${env} mode`);
  logger.info(`→ App listening on the port ${port}`);
  logger.info(`→ URL: http://localhost:${port}`);
  logger.info(`=================================`);
  logger.info(`=================================`);
});
