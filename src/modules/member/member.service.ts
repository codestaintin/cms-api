import httpStatus from 'http-status';
import mongoose from 'mongoose';
import Member from './member.model';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IMember, IMemberDoc, UpdatedMemberBody } from './member.interface';

export const createMember = async (memberBody: IMember): Promise<IMemberDoc> => {
    const member = await Member.create(memberBody);
    return member;
}

export const queryMembers = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const member = await Member.paginate(filter, options);
    return member;
}

export const getMemberById = async (id: mongoose.Types.ObjectId) : Promise<IMemberDoc |  null> => Member.findById(id);

export const updateMemberById = async (
    memberId: mongoose.Types.ObjectId,
    updateBody: UpdatedMemberBody
): Promise<IMemberDoc | null> => {
    const member = await getMemberById(memberId);
    if (!member) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
    }
    Object.assign(member, updateBody);
    await member.save();
    return member
}

export const deleteMemberById = async (id: mongoose.Types.ObjectId): Promise<IMemberDoc | null> => {
    const member = await getMemberById(id);
    if (!member) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
    }
    await member.deleteOne();
    return member;
}