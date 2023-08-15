import Joi from 'joi';
import { objectId } from '../validate';
import { IGroup } from './group.interface';

const createGroupBody: Record<keyof IGroup, any> = {
    name: Joi.string().required(),
    description: Joi.string().required(),
    roles: Joi.array().required(),
    members: Joi.array().required(),
    branchId: Joi.string().custom(objectId)
};

export const createGroup = {
    body: Joi.object().keys(createGroupBody)
};

export const getGroups = {
    query: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        roles: Joi.array(),
        members: Joi.array(),
        branchId: Joi.string().custom(objectId),
        sortBy: Joi.string(),
        projectBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

export const getGroup = {
    params: Joi.object().keys({
        groupId: Joi.string().custom(objectId)
    }),
};

export const updateGroup = {
    params: Joi.object().keys({
        groupId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        description: Joi.string(),
        roles: Joi.array(),
        members: Joi.array(),
        branchId: Joi.string().custom(objectId)
    }).min(1),
};

export const deleteGroup = {
    params: Joi.object().keys({
        groupId: Joi.string().custom(objectId)
    })
};