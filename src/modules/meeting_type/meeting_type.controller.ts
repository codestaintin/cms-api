import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as meetingTypeService from './meeting_type.service';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { pick, catchAsync } from '../utils';

export const createMeetingType = catchAsync(async (req: Request, res: Response) => {
    const meetingType = await meetingTypeService.createMeetingType(req.body);
    res.status(httpStatus.CREATED).send(meetingType);
});

export const getMeetingTypes = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['name']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result: QueryResult = await meetingTypeService.queryMeetingTypes(filter, options);
    res.send(result);
});

export const getMeetingType = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['meetingTypeId'] === 'string') {
        const meetingType = await meetingTypeService.getMeetingTypeById(new mongoose.Types.ObjectId(req.params['meetingTypeId']));
        if (!meetingType) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Meeting type not found');
        }
        res.send(meetingType);
    }
});

export const updateMeetingType = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['meetingTypeId'] === 'string') {
        const meetingType = await meetingTypeService
            .updateMeetingTypeById(new mongoose.Types.ObjectId(req.params['meetingTypeId']), req.body);
        res.send(meetingType);
    }
});

export const deleteMeetingType = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['meetingTypeId'] === 'string') {
        const meetingType = await meetingTypeService
            .deleteMeetingById(new mongoose.Types.ObjectId(req.params['meetingTypeId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});

