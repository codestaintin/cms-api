import express, { Express } from 'express';
import helmet from 'helmet';
//import xss from 'xss-clean';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import cors from 'cors';
import passport from 'passport';
import httpStatus from 'http-status';
import config from './config/config';
import { morgan } from './modules/logger';

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

//app.use(xss());
app.use(ExpressMongoSanitize());


//app.use(passport.initialize());
//passport.use('jwt', jwtStrategy);

// send back a 404 error for any unknown api request
//

export default app;

