import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export enum maritalStatus {
    single = 'single',
    married = 'married',
    divorced = 'divorced',
    widow = 'widow',
    widower = 'widower'
};

export interface IMember {
    title?: string,
    firstName: string,
    middleName: string,
    lastName: string,
    gender: string,
    dob: Date,
    address: string,
    occupation: string,
    role?: string[],
    status: string,
    mobile: string,
    email?: string,
    branchId: any,
    maritalStatus: maritalStatus
}
export interface IMemberDoc extends IMember, Document{}

export type UpdatedMemberBody = Partial<IMember>;
export interface IMemberModel extends Model<IMember> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
};
