import { Model, Document } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IRevenue {
    amount: Number,
    revenueSource: string,
    date: Date,
    branchId: any,
    revenueTypeId: any,
    recordedBy: any
}

export interface IRevenueDoc extends IRevenue, Document{}

export type UpdateRevenueBody = Partial<IRevenue>
export interface IRevenueModel extends Model<IRevenueDoc> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>
};
