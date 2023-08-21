import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as revenueService from './revenue.service';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import { pick, catchAsync } from '../utils';
import { getBranchById } from '../branch/branch.service';

export const createRevenue = catchAsync(async (req: Request, res: Response) => {
    const branch = await getBranchById(new mongoose.Types.ObjectId(req.params['branchId']));
    if (!branch) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found');
    }
    const revenue = await revenueService.createRevenue({
        amount: req.body.amount,
        revenueSource: req.body.revenueSource,
        date: req.body.date,
        branchId: branch,
        revenueTypeId: req.body.revenueTypeId,
        recordedBy: req.user
    });
    res.status(httpStatus.CREATED).send(revenue);
});

export const getRevenues = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['date']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result: QueryResult = await revenueService.queryRevenues(filter, options);
    res.send(result);
});

export const getRevenue = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['revenueId'] === 'string') {
        const revenue = await revenueService
            .getRevenueById(new mongoose.Types.ObjectId(req.params['revenueId']));
        if (!revenue) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Revenue not found');
        }
        res.send(revenue);
    }
});

export const updateRevenue = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['revenueId'] === 'string') {
        const revenue = await revenueService
            .updateRevenueById(new mongoose.Types.ObjectId(req.params['revenueId']), req.body);
        res.send(revenue);
    }
});

export const deleteRevenue = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['revenueId'] === 'string') {
        const revenue = await revenueService
            .deleteRevenueById(new mongoose.Types.ObjectId(req.params['revenueId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});



