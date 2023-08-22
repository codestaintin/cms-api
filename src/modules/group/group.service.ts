import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Group from './group.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IGroup, IGroupDoc, UpdatedGroupBody } from './group.interface';

export const createGroup = async (groupBody: IGroup) => {
    const group = await Group.create(groupBody);
    return group;
};

export const queryGroups = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const groups = await Group.paginate(filter, options);
    return groups;
};

export const getGroupById = async (id: mongoose.Types.ObjectId): Promise<IGroupDoc | null> => Group.findById(id);

export const updateGroupById = async (
    groupId: mongoose.Types.ObjectId,
    updateBody: UpdatedGroupBody
): Promise<IGroupDoc | null> => {
    const group = await getGroupById(groupId);
    if (!group) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
    }
    Object.assign(group, updateBody);
    await group.save();
    return group;
};

export const deleteGroupById = async (id: mongoose.Types.ObjectId): Promise<IGroupDoc | null> => {
    const group = await getGroupById(id);
    if (!group) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Group not found');
    }
    await group.deleteOne();
    return group;
};
