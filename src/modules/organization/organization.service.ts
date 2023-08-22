import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Organization from './organization.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IOrganization ,IOrganizationDoc, UpdatedOrganizationBody } from './organization.interface';

export const createOrganization = async (organizationBody: IOrganization): Promise<IOrganizationDoc> => {
    const organization = await Organization.create(organizationBody);
    return organization;
};

export const queryOrganization = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const organization = await Organization.paginate(filter, options);
    return organization;
};

export const getOrganizationById = async (id: mongoose.Types.ObjectId): Promise<IOrganizationDoc | null> => Organization.findById(id);

export const updateOrganizationById = async (
    organizationId: mongoose.Types.ObjectId,
    updateBody: UpdatedOrganizationBody
): Promise<IOrganizationDoc | null> => {
    const organization = await getOrganizationById(organizationId);
    if (!organization) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
    }
    Object.assign(organization, updateBody);
    await organization.save();
    return organization;
};

export const deleteOrganizatioById = async (id: mongoose.Types.ObjectId): Promise<IOrganizationDoc | null> => {
    const organization = await getOrganizationById(id);
    if (!organization) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
    }
    await organization.deleteOne();
    return organization;
};
