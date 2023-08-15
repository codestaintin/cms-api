import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IGroup {
    name: string,
    description: string,
    roles: string[],
    members: string[],
    branchId: any
}

export interface IGroupDoc extends IGroup, Document {}

export type UpdatedGroupBody = Partial<IGroup>;

export interface IGroupModel extends Model<IGroup> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
};