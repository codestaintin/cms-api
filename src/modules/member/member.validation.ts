import Joi from 'joi';
import { objectId } from '../validate';
import { IMember, maritalStatus } from './member.interface';

const memberBody = {
    title: Joi.string(),
    address: Joi.string(),
    branchId: Joi.string(),
    dob: Joi.date(),
    firstName: Joi.string(),
    gender: Joi.string()
        .valid(...['M', 'Male', 'F', 'Female'])
        .default('M'),
    lastName: Joi.string(),
    maritalStatus: Joi.string(),
    middleName: Joi.string(),
    mobile: Joi.string(),
    occupation: Joi.string(),
    status: Joi.string(),
    email: Joi.string().email()
}

const createMemberBody: Record<keyof IMember, any> = {
    title: Joi.string(),
    address: Joi.string().required(),
    branchId: Joi.string().required().custom(objectId),
    dob: Joi.date().required(),
    firstName: Joi.string().required(),
    gender: Joi.string().required()
        .valid(...['M', 'Male', 'F', 'Female'])
        .default('M'),
    lastName: Joi.string().required(),
    maritalStatus: Joi.string().required().valid(...Object.values(maritalStatus)),
    middleName: Joi.string().required(),
    mobile: Joi.string().required(),
    occupation: Joi.string().required(),
    status: Joi.string().required(),
    email: Joi.string().email()
};

export const createMember = {
    body: Joi.object().keys(createMemberBody)
};

export let updateMember: { params: Joi.ObjectSchema<any>; body: Joi.ObjectSchema<any> };
updateMember = {
    params: Joi.object().keys({
        memberId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys(memberBody).min(1)
};

export const getMembers = {
    query: Joi.object().keys(memberBody),
};

export const getMember = {
    params: Joi.object().keys({
        memberId: Joi.string().custom(objectId),
    }),
};

export const deleteMember = {
    params: Joi.object().keys({
        memberId: Joi.string().custom(objectId),
    }),
};