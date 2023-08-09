import jwt from 'jsonwebtoken';
import moment, { Moment } from 'moment';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import config from '../../config/config';
import Token from './token.model';
import ApiError from '../errors/ApiError';
import tokenTypes from './token.types';
import { AccessAndRefreshTokens, ITokenDoc } from './token.interfaces';
import { IUserDoc } from '../user/user.interface';

export const generateToken = (
    userId: mongoose.Types.ObjectId,
    expires: Moment,
    type: string,
    secret: string = config.jwt.secret
): string => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
    };
    return jwt.sign(payload, secret);
};

export const saveToken = async (
    token: string,
    userId: mongoose.Types.ObjectId,
    expires: Moment,
    type: string
): Promise<ITokenDoc> => {
    const tokenDoc = await Token.create({
        token,
        user: userId,
        expires: expires.toDate(),
        type
    });
    return tokenDoc;
};

export const verifyToken = async (token: string, type: string): Promise<ITokenDoc> => {
    const payload = jwt.verify(token, config.jwt.secret);
    if (typeof payload.sub !== 'string') {
        throw new ApiError(httpStatus.BAD_REQUEST, 'Bad User');
    }
    const tokenDoc = await Token.findOne({
        token,
        type,
        user: payload.sub,
    });
    if (!tokenDoc) {
        throw new Error('Invalid authorization token');
    }
    return tokenDoc;
}

export const generateAuthTokens = async (user: IUserDoc): Promise<AccessAndRefreshTokens> => {
    const accesstokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateToken(user.id, accesstokenExpires, tokenTypes.ACCESS);
    
    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
    await saveToken(refreshToken, user.id, refreshTokenExpires, tokenTypes.REFRESH);
    
    return {
        access: {
            token: accessToken,
            expires: accesstokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate()
        },
    };
};
