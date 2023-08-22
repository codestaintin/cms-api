import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as revenueTypeService from './revenue_type.service';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { pick, catchAsync } from '../utils';

export const createRevenueType = catchAsync(async (req: Request, res: Response) => {
    const revenueType = await revenueTypeService.createRevenueType(req.body);
    res.status(httpStatus.CREATED).send(revenueType);
});

export const getRevenueTypes = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['name']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result: QueryResult = await revenueTypeService.queryRevenueTypes(filter, options);
    res.send(result);
});

export const getRevenueType = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['revenueTypeId'] === 'string') {
        const revenueType = await revenueTypeService.getRevenueTypeById(new mongoose.Types.ObjectId(req.params['revenueTypeId']));
        if (!revenueType) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Meeting type not found');
        }
        res.send(revenueType);
    }
});

export const updateRevenueType = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['revenueTypeId'] === 'string') {
        const revenueType = await revenueTypeService
            .updateRevenueTypeById(new mongoose.Types.ObjectId(req.params['revenueTypeId']), req.body);
        res.send(revenueType);
    }
});

export const deleteRevenueType = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['revenueTypeId'] === 'string') {
        const revenueType = await revenueTypeService
            .deleteRevenueById(new mongoose.Types.ObjectId(req.params['revenueTypeId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});
