import hpp from 'hpp';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import passport from 'passport';
import session from 'express-session';
import { stream } from '@utils/logger';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import methodOverride from 'method-override';

import errorMiddleware from '@middlewares/error.middleware';
import { LOG_FORMAT, ORIGIN, CREDENTIALS } from '@config';
// EXPRESS APP
const app = express();
// PASSPORT
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: 'google-auth',
  }),
);
app.use(passport.initialize());
app.use(passport.session());
// CORS
const corsOptions = cors({
  origin: [ORIGIN],
  credentials: CREDENTIALS,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

// App Initialization
app.use(hpp());
app.use(helmet());
app.use(corsOptions);
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(morgan(LOG_FORMAT, { stream }));
app.use(express.urlencoded({ extended: true }));
// Error Handling
app.use(errorMiddleware);
app.use(methodOverride('_method'));

export default app;
