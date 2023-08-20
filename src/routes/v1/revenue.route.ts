import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { auth } from '../../modules/auth';
import { revenueTypeController, revenueTypeValidation } from '../../modules/revenue_type';

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

export default router;