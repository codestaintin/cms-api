import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { memberValidation, memberController } from '../../modules/member';

const router: Router = express.Router();

router
    .route('/')
    .get(validate(memberValidation.getMembers), memberController.getMembers)
    .post(validate(memberValidation), memberController.createMember);

router
    .route('/:memberId')
    .get(validate(memberValidation.getMember), memberController.getMember)
    .patch(validate(memberValidation.updateMember), memberController.updateMember)
    .delete(validate(memberValidation.deleteMember), memberController.deleteUser);


export default router;