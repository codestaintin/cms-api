import Joi from 'joi';
import { objectId } from '../validate';
import { IOrganization } from './organization.interface';

const createdOrganizationBody: Record<keyof IOrganization, any> = {
    name: Joi.string().required(),
    logo: Joi.string(),
    banner: Joi.string(),
    createdBy: Joi.string().custom(objectId),
}

export const createOrganization = {
    body: Joi.object().keys(createdOrganizationBody),
}

export const getOrganizations = {
    query: Joi.object().keys({
        name: Joi.string(),
        logo: Joi.string(),
        banner: Joi.string(),
        createdBy: Joi.string().custom(objectId),
        sortBy: Joi.string(),
        projectBy: Joi.string(),
        limit: Joi.number().integer(),
        page: Joi.number().integer(),
    }),
};

export const getOrganization = {
    params: Joi.object().keys({
        organizationId: Joi.string().custom(objectId)
    })
};

export const updateOrganization = {
    params: Joi.object().keys({
        organizationId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys({
        name: Joi.string(),
        logo: Joi.string(),
        banner: Joi.string(),
    }).min(1),
};

export const deleteOrganization = {
    params: Joi.object().keys({
        organizationId: Joi.string().custom(objectId)
    })
};
