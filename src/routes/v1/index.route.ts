import express, { Router } from 'express';
import userRoute from './user.route';

const router = express.Router();

interface IRoute {
    path: string;
    route: Router;
}

const defaultRoute: IRoute[] = [
    {
        path: '/',
        route: userRoute
    },
];

defaultRoute.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;

