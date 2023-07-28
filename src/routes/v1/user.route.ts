import express, { Router } from 'express';
import { userController, userValidation } from '../../modules/user';
import { validate }  from '../../modules/validate';

const router: Router = express.Router();

router
    .route('/')
    .post(validate(userValidation.createUser), userController.createUser)
    .get(validate(userValidation.getUsers), userController.getUsers);

router
    .route('/:userId')
    .get(validate(userValidation.getUser), userController.getUser)
    .patch(validate(userValidation.updateUser), userController.updateUser)
    .delete(validate(userValidation.deleteUser), userController.deleteUser);


//router.route('/hello').get(userController.welcome);

export default router;