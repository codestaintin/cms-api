import Joi from 'joi';
import { IMeetingType } from './meeting_type.interface';
import { objectId } from '../validate';

const createMeetingTypeBody: Record<keyof IMeetingType, any> = {
    name: Joi.string().required()
};

export const createMeetingType = {
    body: Joi.object().keys(createMeetingTypeBody)
};

export const getMeetingType = {
    params: Joi.object().keys({
        meetingTypeId: Joi.string().custom(objectId),
    }),
};

export const getMeetingTypes = {
    query: Joi.object().keys({
        name: Joi.string()
    }),
};
export const updateMeetingType = {
    params: Joi.object().keys({
        meetingTypeId: Joi.required().custom(objectId)
    }),
    body: Joi.object().keys({ name: Joi.string().required() })
}

export const deleteMeetingType = {
    params: Joi.object().keys({
        meetingTypeId: Joi.string().custom(objectId),
    }),
};
