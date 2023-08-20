import Joi from 'joi';
import { IRevenueType } from './revenue_type.interface';
import { objectId } from '../validate';

const createRevenueTypeBody: Record<keyof IRevenueType, any> = {
    name: Joi.string().required()
};

export const createRevenueType = {
    body: Joi.object().keys(createRevenueTypeBody)
};

export const getRevenueType = {
    params: Joi.object().keys({
        revenueTypeId: Joi.string().custom(objectId),
    }),
};

export const getRevenueTypes = {
    query: Joi.object().keys({
        name: Joi.string()
    }),
};
export const updateRevenueType = {
    params: Joi.object().keys({
        revenueTypeId: Joi.required().custom(objectId)
    }),
    body: Joi.object().keys({ name: Joi.string().required() })
}

export const deleteRevenueType = {
    params: Joi.object().keys({
        revenueTypeId: Joi.string().custom(objectId),
    }),
};