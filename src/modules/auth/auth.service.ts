import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Token from '../token/token.model';
import ApiError from '../errors/ApiError';
import tokenTypes from '../token/token.types';
import { getUserByEmail, getUserById, updateUserById } from '../user/user.service';
import { IUserDoc, IUserWithTokens } from '../user/user.interface';
import { generateAuthTokens, verifyToken } from '../token/token.service';


export const loginUserWithEmailAndPassword = async (email: string, password: string): Promise<IUserDoc> => {
    const user = await getUserByEmail(email);
    if (!user || !(await user.isPasswordMatch(password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
    }
    return user;
};

export const logout = async (refreshToken: string): Promise<void> => {
    const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH });
    if (!refreshTokenDoc) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
    }
    await refreshTokenDoc.deleteOne();
};

export const refreshAuth = async (refreshToken: string): Promise<IUserWithTokens> => {
    try {
        const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);
        const user = await getUserById(new mongoose.Types.ObjectId(refreshTokenDoc.user));
        if (!user) {
            throw new Error();
        }
        await refreshTokenDoc.deleteOne();
        const tokens = await generateAuthTokens(user);
        return { user, tokens };
    } catch (error) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
    }
};

