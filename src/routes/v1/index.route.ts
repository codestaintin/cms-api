import express, { Router } from 'express';
import userRoute from './user.route';
import authRoute from './auth.route';
import organizationRoute from './organization.route';
import memberRoute from './member.route';
import branchRoute from './branch.route';


const router = express.Router();

interface IRoute {
    path: string;
    route: Router;
}

const defaultRoute: IRoute[] = [
    {
        path: '/users',
        route: userRoute
    },
    {
        path: '/auth',
        route: authRoute
    },
    {
        path: '/organization',
        route: organizationRoute
    },
    {
        path: '/member',
        route: memberRoute
    },
    {
        path: '/branch',
        route: branchRoute
    }
];

defaultRoute.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;

