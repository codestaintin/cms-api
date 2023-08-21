import Joi from 'joi';
import { IRevenue } from './revenue.interface';
import { objectId } from '../validate';

const createRevenueBody: Record<keyof IRevenue, any> = {
    amount: Joi.number().required(),
    revenueSource: Joi.string().required(),
    date: Joi.date().required(),
    branchId: Joi.custom(objectId),
    revenueTypeId: Joi.custom(objectId).required(),
    recordedBy: Joi.custom(objectId)
};

export const createRevenue = {
    body: Joi.object().keys(createRevenueBody)
};

export const getRevenue = {
    params: Joi.object().keys({
        revenueId: Joi.string().custom(objectId),
    }),
};

export const getRevenues = {
    query: Joi.object().keys({
        amount: Joi.number(),
        revenueSource: Joi.string(),
        date: Joi.date(),
        branchId: Joi.custom(objectId),
        revenueTypeId: Joi.custom(objectId),
        recordedBy: Joi.custom(objectId)
    }),
};

export const updateRevenue = {
    params: Joi.object().keys({
        revenueId: Joi.required().custom(objectId)
    }),
    body: Joi.object().keys({
        amount: Joi.number(),
        revenueSource: Joi.string(),
        date: Joi.date(),
        branchId: Joi.custom(objectId),
        revenueTypeId: Joi.custom(objectId),
        recordedBy: Joi.custom(objectId)
    })
};

export const deleteRevenue = {
    params: Joi.object().keys({
        revenueId: Joi.string().custom(objectId),
    }),
};