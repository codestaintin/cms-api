import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as memberService from './member.service';
import ApiError from '../errors/ApiError';
import {IOptions, QueryResult} from '../paginate/paginate';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

export const createMember = catchAsync(async (req: Request, res: Response) => {
    const member = await memberService.createMember(req.body);
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
    console.log(req.body);
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