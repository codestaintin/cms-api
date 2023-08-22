import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IMeeting {
    name: string,
    date: Date,
    attendance?: Number,
    anchors: string[],
    meetingTypeId: any,
    branchId: any,
    recordedBy: any
}

export interface IMeetingDoc extends IMeeting, Document{}

export type UpdateMeetingBody = Partial<IMeeting>;

export interface IMeetingModel extends Model<IMeeting> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
};
