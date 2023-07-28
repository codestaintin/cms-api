import express, { Express } from 'express';
import helmet from 'helmet';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import httpStatus from 'http-status';
import config from './config/config';
import { morgan } from './modules/logger';
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


app.use('/v1', routes);

app.use((_req, _res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'));
});

app.use(errorConverter);

app.use(errorHandler);

export default app;

