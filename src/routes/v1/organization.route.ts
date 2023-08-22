import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { validate } from '../../modules/validate';
import  { organizationValidation, organizationController } from '../../modules/organization';

const router: Router = express.Router();

router
    .route('/')
    .get(auth('getOrganizations'),
        validate(organizationValidation.getOrganizations), organizationController.getOrganizations)
    .post(auth('manageOrganizations'),
        validate(organizationValidation.createOrganization), organizationController.createOrganization);

router
    .route('/:organizationId')
    .get(auth('getOrganizations'), validate(organizationValidation.getOrganization), organizationController.getOrganization)
    .patch(auth('manageOrganizations'), validate(organizationValidation.updateOrganization), organizationController.updateOrganization)
    .delete(auth('manageOrganizations'), validate(organizationValidation.deleteOrganization), organizationController.deleteOrganization);
export default router;
