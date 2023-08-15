import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as memberService from './member.service';
import { getBranchById } from '../branch/branch.service';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

export const createMember = catchAsync(async (req: Request, res: Response) => {
    const branch = await getBranchById(new mongoose.Types.ObjectId(req.params['branchId']));
    if (!branch) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found');
    }
    const member = await memberService.createMember({
        title: req.body.title,
        firstName: req.body.firstName,
        middleName: req.body.middleName,
        lastName: req.body.lastName,
        gender: req.body.gender,
        dob: req.body.dob,
        address: req.body.address,
        occupation: req.body.occupation,
        role: req.body.role,
        status: req.body.status,
        mobile: req.body.mobile,
        email: req.body.email,
        branchId: branch,
        maritalStatus: req.body.maritalStatus
    });
    res.status(httpStatus.CREATED).send(member);
});

export const getMembers = catchAsync(async (req: Request, res: Response)=>{
    const filter = pick(req.query, ['firstName']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result: QueryResult = await memberService.queryMembers(filter, options);
    res.send(result);
});

export const getMember = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['memberId'] === 'string') {
        const member = await memberService
            .getMemberById(new mongoose.Types.ObjectId(req.params['memberId']));
        if (!member) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Member not found');
        }
        res.send(member);
    }
});

export const updateMember = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['memberId'] === 'string') {
        const member = await memberService
            .updateMemberById(new mongoose.Types.ObjectId(req.params['memberId']), req.body);
        res.send(member);
    }
});

export const deleteUser = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['memberId'] === 'string') {
        const member = await memberService
            .deleteMemberById(new mongoose.Types.ObjectId(req.params['memberId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});