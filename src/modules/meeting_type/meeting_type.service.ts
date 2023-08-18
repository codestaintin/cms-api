import httpStatus from 'http-status';
import mongoose from 'mongoose';
import MeetingType from './meeting_type.model';
import ApiError from '../errors/ApiError';
import { IMeetingType, IMeetingTypeDoc, UpdateMeetingTypeBody} from './meeting_type.interface';
import { IOptions, QueryResult } from '../paginate/paginate';

export const createMeetingType = async (meetingTypeBody: IMeetingType): Promise<IMeetingTypeDoc> => {
    const meetingType = await MeetingType.create(meetingTypeBody);
    return meetingType;
};

export const queryMeetingTypes = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const meetingType = await MeetingType.paginate(filter, options);
    return meetingType
};

export const getMeetingTypeById = async (id: mongoose.Types.ObjectId): Promise<IMeetingTypeDoc | null> => MeetingType.findById(id);

export const updateMeetingTypeById = async (
    meetingTypeId: mongoose.Types.ObjectId,
    updateBody: UpdateMeetingTypeBody
): Promise<IMeetingTypeDoc | null> => {
    const meetingType = await getMeetingTypeById(meetingTypeId);
    if (!meetingType) {
        throw new ApiError(httpStatus.NOT_FOUND, 'MeetingType not found');
    }
    Object.assign(meetingType, updateBody);
    await meetingType.save();
    return meetingType;
};

export const deleteMeetingById = async (id: mongoose.Types.ObjectId): Promise<IMeetingTypeDoc | null> => {
    const meetingType = await getMeetingTypeById(id);
    if (!meetingType) {
        throw new ApiError(httpStatus.NOT_FOUND, 'meetingType not found');
    }
    await meetingType.deleteOne();
    return meetingType;
};