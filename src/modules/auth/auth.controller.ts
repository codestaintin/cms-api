import httpStatus from 'http-status';
import { Request, Response } from 'express';
import { catchAsync } from "../utils";
import { tokenService } from '../token';
import { userService } from '../user';
import * as authService from './auth.service';
import mongoose from 'mongoose';

export const register = catchAsync(async (req: Request, res: Response) => {
    const user = await userService.registerUser(req.body);
    const token = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, token });
});

export const login = catchAsync(async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const user = await authService.loginUserWithEmailAndPassword(email, password);
    const tokens = await tokenService.generateAuthTokens(user);
    res.send({ user, tokens });
});

export const logout = catchAsync(async (req: Request, res: Response) => {
    await authService.logout(req.body.refreshToken);
    res.status(httpStatus.NO_CONTENT).send();
});

export const refreshTokens = catchAsync(async (req: Request, res: Response) => {
    const userWithTokens = await authService.refreshAuth(req.body.refreshToken);
    res.send({ ...userWithTokens });
});

export const grantAdminAccess = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['userId'] === 'string') {
        const user = await authService.grantAdminAccess(new mongoose.Types.ObjectId(req.params['userId']));
        res.status(httpStatus.OK).send(user);
    }
});

export const revokeAdminAccess = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['userId'] === 'string') {
        const user = await authService.revokeAdminAccess(new mongoose.Types.ObjectId(req.params['userId']));
        res.status(httpStatus.OK).send(user);
    }
});