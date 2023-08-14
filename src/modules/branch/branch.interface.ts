import { Document, Model } from 'mongoose';
import { QueryResult} from '../paginate/paginate';

export interface IBranch {
    name: string,
    address: string,
    logo?: string,
    banner?: string,
    createdBy: any,
    organization: any
}

export interface IBranchDoc extends IBranch, Document{}

export type UpdateBranchBody = Partial<IBranch>;

export interface IBranchModel extends Model<IBranch> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>
}