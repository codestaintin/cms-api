import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { groupValidation, groupController } from '../../modules/group';

const router: Router = express.Router();

router
    .route('/:branchId')
    .post(validate(groupValidation.createGroup), groupController.createGroup);

router
    .route('/')
    .get(validate(groupValidation.getGroups), groupController.getGroups);

router
    .route('/:groupId')
    .get(validate(groupValidation.getGroup), groupController.getGroup)
    .patch(validate(groupValidation.updateGroup), groupController.updateGroup)
    .delete(validate(groupValidation.deleteGroup), groupController.deleteGroup);

export default router;
