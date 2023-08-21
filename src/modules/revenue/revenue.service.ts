import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Revenue from './revenue.model';
import ApiError from '../errors/ApiError';
import { IRevenue, IRevenueDoc, UpdateRevenueBody } from './revenue.interface';
import { IOptions, QueryResult } from '../paginate/paginate';

export const createRevenue = async (revenueBody: IRevenue): Promise<IRevenueDoc> => {
    const revenue = await Revenue.create(revenueBody);
    return revenue;
};

export const queryRevenues = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const revenues = await Revenue.paginate(filter, options);
    return revenues;
};

export const getRevenueById = async (id: mongoose.Types.ObjectId): Promise<IRevenueDoc | null> => Revenue.findById(id);

export const updateRevenueById = async (
    revenueId: mongoose.Types.ObjectId,
    updateBody: UpdateRevenueBody): Promise<IRevenueDoc | null> => {
    const revenue = await getRevenueById(revenueId);
    if (!revenue) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Revenue not found');
    }
    Object.assign(revenue, updateBody);
    await revenue.save();
    return revenue;
};

export const deleteRevenueById = async (id: mongoose.Types.ObjectId): Promise<IRevenueDoc | null> => {
    const revenue = await getRevenueById(id);
    if (!revenue) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Revenue not found');
    }
    await revenue.deleteOne();
    return revenue;
}