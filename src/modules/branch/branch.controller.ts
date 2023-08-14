import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as branchService from './branch.service';
import { getOrganizationById } from '../organization/organization.service';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

export const createBranch = catchAsync(async (req: Request, res: Response) => {
    const organizationId = await getOrganizationById(new mongoose.Types.ObjectId(req.params['organizationId']));
    const branch = await branchService.createBranch({
        name: req.body.name,
        address: req.body.address,
        logo: req.body.logo,
        banner: req.body.banner,
        createdBy: req.user,
        organization: organizationId
    });
    res.status(httpStatus.CREATED).send(branch);
});

export const getBranches = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['name']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result: QueryResult = await branchService.queryMembers(filter, options);
    res.send(result);
});

export const getBranch = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['branchId'] === 'string') {
        const branch = await branchService
            .getBranchById(new mongoose.Types.ObjectId(req.params['branchId']));
        if (!branch) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found');
        }
        res.send(branch);
    }
});

export const updateBranch = catchAsync(async (req: Request, res: Response) => {
    const branch = await branchService
        .updateMemberById(new mongoose.Types.ObjectId(req.params['branchId']), req.body);
    res.send(branch);
});

export const deleteBranch = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['branchId'] === 'string') {
        const branch = await branchService.deleteBranchById(new mongoose.Types.ObjectId(req.params['branchId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});
