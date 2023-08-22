import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { expenseController, expenseValidation } from '../../modules/expenses';

const router: Router = express.Router();

router
    .route('/:branchId')
    .post(auth('manageBranches'), validate(expenseValidation.createExpenses), expenseController.createExpense)
    .get(auth('manageBranches'), validate(expenseValidation.getExpenses), expenseController.getExpenses);

router
    .route('/branch/:expenseId')
    .get(auth('manageBranches'), validate(expenseValidation.getExpense), expenseController.getExpense)
    .patch(auth('manageBranches'), validate(expenseValidation.updateExpenses), expenseController.updateExpense)
    .delete(auth('manageBranches'), validate(expenseValidation.deleteExpense), expenseController.deleteExpense);

export default router;
