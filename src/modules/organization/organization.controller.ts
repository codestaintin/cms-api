import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import * as organizationService from './organization.service';
import ApiError from '../errors/ApiError';
import { IOptions } from '../paginate/paginate';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';
export const createOrganization = catchAsync(async (req: Request, res: Response) => {
    const organization = await organizationService.createOrganization({
        name: req.body.name,
        logo: req.body.logo,
        banner: req.body.banner,
        createdBy: req.user
    });
    res.status(httpStatus.CREATED).send(organization);
});

export const getOrganizations = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['name']);
    const options: IOptions = pick(req.query, ['sortBy', 'limit', 'page', 'projectBy']);
    const result = await organizationService.queryOrganization(filter, options);
    res.send(result);
});

export const getOrganization = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['organizationId'] === 'string') {
        const organization = await organizationService.getOrganizationById(new mongoose.Types.ObjectId(req.params['organizationId']));
        if (!organization) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Organization not found');
        }
        const populateUser = await organization.populate({
            path:'createdBy', select: 'firstName lastName'
        });
        res.send(populateUser);
    }
});

export const updateOrganization = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['organizationId'] === 'string') {
        const organization = await organizationService.updateOrganizationById(new mongoose.Types.ObjectId(req.params['organizationId']), req.body);
        res.send(organization);
    }
});

export const deleteOrganization = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['organizationId'] === 'string') {
        const organization = await organizationService.deleteOrganizatioById(new mongoose.Types.ObjectId(req.params['organizationId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});