import Joi from 'joi';
import { objectId } from '../validate';
import { IExpenses } from './expenses.interface';

const expensesBody = {
    amount: Joi.number(),
    purpose: Joi.string(),
    date: Joi.date(),
    receivedBy: Joi.string(),
    branchId: Joi.string().custom(objectId),
    recordedBy: Joi.string().custom(objectId)
};

const createExpensesBody: Record<keyof IExpenses, any> = {
    amount: Joi.number().required(),
    purpose: Joi.string().required(),
    date: Joi.date().required(),
    receivedBy: Joi.string().required(),
    branchId: Joi.string().custom(objectId),
    recordedBy: Joi.string().custom(objectId)
};

export const createExpenses = {
    body: Joi.object().keys(createExpensesBody)
};

export const updateExpenses = {
    params: Joi.object().keys({
        expenseId: Joi.string().custom(objectId)
    }),
    body: Joi.object().keys(expensesBody).min(1)
};

export const getExpenses = {
    query: Joi.object().keys(expensesBody),
};

export const getExpense = {
    params: Joi.object().keys({
        expenseId: Joi.string().custom(objectId)
    }),
};

export const deleteExpense = {
    params: Joi.object().keys({
        expenseId: Joi.string().custom(objectId)
    }),
};
