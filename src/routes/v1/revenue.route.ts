import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { revenueTypeController, revenueTypeValidation } from '../../modules/revenue_type';
import { revenueController, revenueValidation } from '../../modules/revenue';

const router: Router = express.Router();

router
    .route('/')
    .post(validate(revenueTypeValidation.createRevenueType), revenueTypeController.createRevenueType)
    .get(validate(revenueTypeValidation.getRevenueTypes), revenueTypeController.getRevenueTypes);

router
    .route('/:revenueTypeId')
    .get(validate(revenueTypeValidation.getRevenueType), revenueTypeController.getRevenueType)
    .patch(validate(revenueTypeValidation.updateRevenueType), revenueTypeController.updateRevenueType)
    .delete(validate(revenueTypeValidation.deleteRevenueType), revenueTypeController.deleteRevenueType);

router
    .route('/branch/:branchId')
    .post(auth('manageBranches'), validate(revenueValidation.createRevenue), revenueController.createRevenue);

router
    .route('/branch/revenue')
    .get(auth('manageBranches'), validate(revenueValidation.getRevenues), revenueController.getRevenues)

router
    .route('/branch/:revenueId')
    .get(auth('manageBranches'), validate(revenueValidation.getRevenues), revenueController.getRevenue)
    .patch(auth('manageBranches'), validate(revenueValidation.updateRevenue), revenueController.updateRevenue)
    .delete(auth('manageBranches'), validate(revenueValidation.deleteRevenue), revenueController.deleteRevenue);

export default router;