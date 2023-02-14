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
import connectDatabase from '@/databases';
// AUTH ROUTES
import googleAuthRoutes from '@routes/auth/google.route';
import facebookAuthRoutes from '@routes/auth/facebook.route';
import seriesRoutes from '@/routes/series/common.route';
import imageRoutes from '@/routes/upload/image.route';
import sectionRoutes from '@/routes/series/section.route';

// const run = async () => {
//   try {
//     const done = await testSeriesModel.findById('63d31f17f569f9d9d8cc92f4');
//     console.log(done);
//   } catch (error) {}
// };

// run();

const version = {
  v1: '/v1',
};

app.use('/auth', googleAuthRoutes);
app.use('/auth', facebookAuthRoutes);
// app.use(version.v1, seriesRoutes);
app.use(version.v1, sectionRoutes);

// IMAGE ROUTES

app.use(version.v1, imageRoutes);

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
