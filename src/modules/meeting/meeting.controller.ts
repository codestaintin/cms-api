import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as meetingService from './meeting.service';
import { getBranchById } from '../branch/branch.service';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

export const createMeeting = catchAsync(async (req: Request, res: Response) => {
    const branch = await getBranchById(new mongoose.Types.ObjectId(req.params['branchId']));
    if (!branch) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found');
    }
    const meeting = await meetingService.createMeeting({
        name: req.body.name,
        date: req.body.date,
        attendance: req.body.attendance,
        anchors: req.body.anchors,
        meetingTypeId: req.body.meetingTypeId,
        branchId: branch,
        recordedBy: req.user
    });
    res.status(httpStatus.CREATED).send(meeting);
});

export const getMeetings = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['name']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result: QueryResult = await meetingService.queryMeetings(filter, options);
    res.send(result);
});

export const getMeeting = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['meetingId'] === 'string') {
        const meeting = await meetingService
            .getMeetingById(new mongoose.Types.ObjectId(req.params['meetingId']));
        if (!meeting) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Meeting not found');
        }
        res.send(meeting);
    }
});

export const updateMeeting = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['meetingId'] === 'string') {
        const meeting = await meetingService
            .updateMeetingById(new mongoose.Types.ObjectId(req.params['meetingId']), req.body);
        res.send(meeting);
    }
});

export const deleteMeeting = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['meetingId'] === 'string') {
        const meeting = await meetingService
            .deleteMeetingById(new mongoose.Types.ObjectId(req.params['meetingId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});