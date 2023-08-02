import Joi from 'joi';
import { NewRegisteredUser } from '../user/user.interface';
import { password } from '../validate';

const registerBody: Record<keyof NewRegisteredUser, any> = {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required().custom(password)
};

export const register = {
    body: Joi.object().keys(registerBody),
};

export const login = {
    body: Joi.object().keys({
        email: Joi.string().required(),
        password: Joi.string().required()
    }),
};

export const logout = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required()
    }),
};

export const refreshTokens = {
    body: Joi.object().keys({
        refreshToken: Joi.string().required(),
    }),
};