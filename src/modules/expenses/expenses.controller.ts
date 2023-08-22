import httpStatus from 'http-status';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import * as expenseService from './expenses.service';
import { getBranchById } from '../branch/branch.service';
import ApiError from '../errors/ApiError';
import { IOptions, QueryResult } from '../paginate/paginate';
import catchAsync from '../utils/catchAsync';
import pick from '../utils/pick';

export const createExpense = catchAsync(async (req: Request, res: Response) => {
    const branch = await getBranchById(new mongoose.Types.ObjectId(req.params['branchId']));
    if (!branch) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Branch not found');
    }
    const expense = await expenseService.createExpense({
       amount: req.body.amount,
       purpose: req.body.purpose,
       date: req.body.date,
       receivedBy: req.body.receivedBy,
       branchId: branch,
       recordedBy: req.user
    });
    res.status(httpStatus.CREATED).send(expense);
});

export const getExpenses = catchAsync(async (req: Request, res: Response) => {
    const filter = pick(req.query, ['amount']);
    const options: IOptions = pick(req.query,['sortBy', 'limit', 'page', 'projectBy']);
    const result: QueryResult = await expenseService.queryExpenses(filter, options);
    res.send(result);
});

export const getExpense = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['expenseId'] === 'string') {
        const expense = await expenseService
            .getExpenseById(new mongoose.Types.ObjectId(req.params['expenseId']));
        if (!expense) {
            throw new ApiError(httpStatus.NOT_FOUND, 'Expense not found');
        }
        res.send(expense);
    }
});

export const updateExpense = catchAsync(async (req: Request, res: Response) =>{
    if (typeof req.params['expenseId'] === 'string') {
        const expense = await expenseService
            .updateExpenseById(new mongoose.Types.ObjectId(req.params['expenseId']), req.body);
        res.send(expense);
    }
});

export const deleteExpense = catchAsync(async (req: Request, res: Response) => {
    if (typeof req.params['expenseId'] === 'string') {
        const expense = await expenseService
            .deleteExpenseById(new mongoose.Types.ObjectId(req.params['expenseId']));
        res.status(httpStatus.NO_CONTENT).send();
    }
});
