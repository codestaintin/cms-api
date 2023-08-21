import httpStatus from 'http-status';
import mongoose from 'mongoose';
import RevenueType from './revenue_type.model';
import ApiError from '../errors/ApiError';
import { IRevenueType, IRevenueTypeDoc, UpdateRevenueTypeBody } from './revenue_type.interface';
import { IOptions, QueryResult } from '../paginate/paginate';

export const createRevenueType = async (revenueTypeBody: IRevenueType): Promise<IRevenueTypeDoc> => {
    const revenueType = await RevenueType.create(revenueTypeBody);
    return revenueType;
};

export const queryRevenueTypes = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const revenueType = await RevenueType.paginate(filter, options);
    return revenueType
};

export const getRevenueTypeById = async (id: mongoose.Types.ObjectId): Promise<IRevenueTypeDoc | null> => RevenueType.findById(id);

export const updateRevenueTypeById = async (
    revenueTypeId: mongoose.Types.ObjectId,
    updateBody: UpdateRevenueTypeBody
): Promise<IRevenueTypeDoc | null> => {
    const revenueType = await getRevenueTypeById(revenueTypeId);
    if (!revenueType) {
        throw new ApiError(httpStatus.NOT_FOUND, 'MeetingType not found');
    }
    Object.assign(revenueType, updateBody);
    await revenueType.save();
    return revenueType;
};

export const deleteRevenueById = async (id: mongoose.Types.ObjectId): Promise<IRevenueTypeDoc | null> => {
    const meetingType = await getRevenueTypeById(id);
    if (!meetingType) {
        throw new ApiError(httpStatus.NOT_FOUND, 'meetingType not found');
    }
    await meetingType.deleteOne();
    return meetingType;
};