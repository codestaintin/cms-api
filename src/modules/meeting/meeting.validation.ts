import Joi from 'joi';
import { objectId } from '../validate';
import { IMeeting } from './meeting.interface';

const meetingBody = {
    name: Joi.string(),
    date: Joi.date(),
    attendance: Joi.number(),
    anchors: Joi.array().items(Joi.string()),
    meetingTypeId: Joi.custom(objectId),
    branchId: Joi.custom(objectId),
    recordedBy: Joi.custom(objectId)
};

const createMeetingBody: Record<keyof IMeeting, any> = {
    name: Joi.string().required(),
    date: Joi.date().required(),
    attendance: Joi.number(),
    anchors: Joi.array().items(Joi.string()).required(),
    meetingTypeId: Joi.custom(objectId).required(),
    branchId: Joi.custom(objectId),
    recordedBy: Joi.custom(objectId)
};

export const createMeeting = {
    body: Joi.object().keys(createMeetingBody)
};

export let updateMeeting: {
    params: Joi.ObjectSchema<any>;
    body: Joi.ObjectSchema<any>;
};

updateMeeting = {
    params: Joi.object().keys({
        meetingId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys(meetingBody).min(1)
};

export const getMeetings = {
    query: Joi.object().keys(meetingBody),
};

export const getMeeting = {
    params: Joi.object().keys({
        meetingId: Joi.string().custom(objectId)
    }),
};

export const deleteMeeting = {
    params: Joi.object().keys({
        meetingId: Joi.string().custom(objectId)
    })
}