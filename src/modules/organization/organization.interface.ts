import { Document, Model } from 'mongoose';
import { QueryResult } from '../paginate/paginate';

export interface IOrganization {
    name: string;
    logo?: string;
    banner?: string;
    createdBy: any;
}

export interface IOrganizationDoc extends IOrganization, Document{}

export type UpdatedOrganizationBody = Partial<IOrganization>;

export interface IOrganizationModel extends Model<IOrganizationDoc> {
    paginate(filter: Record<string, any>, options: Record<string, any>): Promise<QueryResult>;
}