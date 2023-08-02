import express, { Router } from 'express';
import { auth } from '../../modules/auth';
import { userController, userValidation } from '../../modules/user';
import { validate }  from '../../modules/validate';

const router: Router = express.Router();

router
    .route('/')
    .post(validate(userValidation.createUser), userController.createUser)
    .get(validate(userValidation.getUsers), userController.getUsers);

router
    .route('/:userId')
    .get(auth('getUsers'),validate(userValidation.getUser), userController.getUser)
    .patch(validate(userValidation.updateUser), userController.updateUser)
    .delete(validate(userValidation.deleteUser), userController.deleteUser);



export default router;