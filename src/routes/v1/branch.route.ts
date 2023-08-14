import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { validate } from '../../modules/validate';
import { branchValidation, branchController } from '../../modules/branch';

const router: Router = express.Router();

router
    .route('/:organizationId/')
    .post(auth('manageBranches'), validate(branchValidation.createBranch), branchController.createBranch);

router
    .route('/')
    .get(auth('getBranches'), validate(branchValidation.getBranches) ,branchController.getBranches);

router
    .route('/:branchId')
    .get(auth('getBranches'), validate(branchValidation.getBranch), branchController.getBranch)
    .patch(auth('manageBranches'), validate(branchValidation.updateBranch),branchController.updateBranch)
    .delete(auth('manageBranches'), validate(branchValidation.deleteBranch),branchController.deleteBranch)

export default router;