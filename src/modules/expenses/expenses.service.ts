import mongoose from 'mongoose';
import httpStatus from 'http-status';
import ApiError from '../errors/ApiError';
import Expenses from './expenses.model';
import { IOptions, QueryResult } from '../paginate/paginate';
import { IExpenses, IExpensesDoc, UpdateExpensesBody } from './expenses.interface';

export const createExpense = async (expenseBody: IExpenses): Promise<IExpensesDoc> => {
    const expense = await Expenses.create(expenseBody);
    return expense;
};

export const queryExpenses = async (filter: Record<string, any>, options: IOptions): Promise<QueryResult> => {
    const expense = await Expenses.paginate(filter, options);
    return expense;
};

export const getExpenseById = async (id: mongoose.Types.ObjectId): Promise<IExpensesDoc | null> =>  Expenses.findById(id);

export const updateExpenseById = async (
    expenseId: mongoose.Types.ObjectId,
    updateBody: UpdateExpensesBody
): Promise<IExpensesDoc | null> => {
    const expense = await getExpenseById(expenseId);
    if (!expense) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Expense not found');
    }
    Object.assign(expense, updateBody);
    await expense.save();
    return expense;
};

export const deleteExpenseById = async (id: mongoose.Types.ObjectId): Promise<IExpensesDoc | null> => {
    const expense = await getExpenseById(id);
    if (!expense) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Expense not found');
    }
    await expense.deleteOne();
    return expense;
};
