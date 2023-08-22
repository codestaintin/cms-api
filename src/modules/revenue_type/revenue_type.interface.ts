import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IRevenueType {
    name: string
}

export interface IRevenueTypeDoc extends IRevenueType, Document {}

export type UpdateRevenueTypeBody = Partial<IRevenueType>

export interface IRevenueTypeModel extends Model<IRevenueTypeDoc> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
};
