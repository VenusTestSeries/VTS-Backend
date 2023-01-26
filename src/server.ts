import app from '@/app';
import { logger } from '@utils/logger';
import { NODE_ENV, PORT } from '@config';
import validateEnv from '@utils/validateEnv';

validateEnv();

const port = PORT || 5000;
const env = NODE_ENV || 'development';
// ROUTES
import HomeRoute from '@routes/index.route';
const indexRoute = HomeRoute();
app.use(indexRoute.path, indexRoute.router);
// AUTH ROUTES
import googleAuthRoutes from '@routes/auth/google.route';
import facebookAuthRoutes from '@routes/auth/facebook.route';
app.use('/auth', googleAuthRoutes);
app.use('/auth', facebookAuthRoutes);

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
