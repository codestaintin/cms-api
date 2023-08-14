import Joi from 'joi';
import { objectId } from '../validate';
import { IBranch } from './branch.interface';

const branchBody = {
    name: Joi.string(),
    address: Joi.string(),
    logo: Joi.string(),
    banner: Joi.string(),
    createdBy: Joi.string().custom(objectId),
    organization: Joi.string().custom(objectId),
};

const createBranchBody: Record<keyof IBranch, any> = {
    name: Joi.string().required(),
    address: Joi.string().required(),
    logo: Joi.string(),
    banner: Joi.string(),
    createdBy: Joi.string().custom(objectId),
    organization: Joi.string().custom(objectId),
}

export const createBranch = {
    body: Joi.object().keys(createBranchBody)
};

export const updateBranch = {
    params: Joi.object().keys({
        branchId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys(branchBody).min(1)
}

export const getBranches = {
    query: Joi.object().keys(branchBody)
};

export const getBranch = {
    params: Joi.object().keys({
        branchId: Joi.string().custom(objectId),
    }),
};

export const deleteBranch = {
    params: Joi.object().keys({
        branchId: Joi.string().custom(objectId),
    }),
};