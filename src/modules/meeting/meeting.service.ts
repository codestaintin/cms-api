import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Meeting from './meeting.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IMeeting, IMeetingDoc, UpdateMeetingBody } from './meeting.interface';

export const createMeeting = async (meetingBody: IMeeting): Promise<IMeetingDoc> => {
    const meeting = await Meeting.create(meetingBody);
    return meeting;
};

export const queryMeetings = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const meetings = await Meeting.paginate(filter, options);
    return meetings;
};

export const getMeetingById = async (id: mongoose.Types.ObjectId): Promise<IMeetingDoc | null> => Meeting.findById(id);

export const updateMeetingById = async (
    meetingId: mongoose.Types.ObjectId,
    updateBody: UpdateMeetingBody
): Promise<IMeetingDoc | null> => {
    const meeting = await getMeetingById(meetingId);
    if (!meeting) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Meeting not found');
    }
    Object.assign(meeting, updateBody);
    await meeting.save();
    return meeting;
};

export const deleteMeetingById = async (id: mongoose.Types.ObjectId): Promise<IMeetingDoc | null> => {
    const meeting = await getMeetingById(id);
    if (!meeting) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Meeting not found');
    }
    await meeting.deleteOne();
    return meeting;
};
