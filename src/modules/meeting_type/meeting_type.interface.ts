import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IMeetingType {
    name: string
}

export interface IMeetingTypeDoc extends IMeetingType, Document {}

export type UpdateMeetingTypeBody = Partial<IMeetingType>

export interface IMeetingTypeModel extends Model<IMeetingTypeDoc> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
};