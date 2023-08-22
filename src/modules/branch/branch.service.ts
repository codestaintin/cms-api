import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Branch from './branch.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IBranch, IBranchDoc, UpdateBranchBody } from './branch.interface';

export const createBranch = async (branchBody: IBranch): Promise<IBranchDoc> => {
    const branch = await Branch.create(branchBody);
    return branch
};

export const queryMembers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const branch = await Branch.paginate(filter, options);
    return branch;
};

export const getBranchById = async (id: mongoose.Types.ObjectId) : Promise<IBranchDoc |  null> => Branch.findById(id);

export const updateMemberById = async (
    branchId: mongoose.Types.ObjectId,
    updateBody: UpdateBranchBody
): Promise<IBranchDoc | null> => {
    const branch = await getBranchById(branchId);
    if (!branch) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
    }
    Object.assign(branch, updateBody);
    await branch.save();
    return branch
};

export const deleteBranchById = async (id: mongoose.Types.ObjectId): Promise<IBranchDoc | null> => {
    const branch = await getBranchById(id);
    if (!branch) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
    }
    await branch.deleteOne();
    return branch;
};
