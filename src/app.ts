import express, { Express } from 'express';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import compression from 'compression';
import cors from 'cors';
import httpStatus from 'http-status';
import passport from 'passport';
import config from './config/config';
import { morgan } from './modules/logger';
import { jwtStrategy } from './modules/auth';
import { authLimiter } from './modules/utils';
import { ApiError, errorConverter, errorHandler } from './modules/errors'
import routes from './routes/v1/index.route';

const app: Express = express();

if(config.env !== 'test') {
    app.use(morgan.successHandler);
    app.use(morgan.errorHandler);
}

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ExpressMongoSanitize());

// gzip compression
app.use(compression());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

if (config.env === 'production') {
    app.use('/v1/auth', authLimiter);
}

app.use('/v1', routes);

app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

export default app;

