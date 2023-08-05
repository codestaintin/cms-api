import express, { Router } from 'express';
import { validate } from '../../modules/validate';
import { authValidation, authController, auth } from '../../modules/auth';
import { userValidation } from '../../modules/user';

const router: Router = express.Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);
router.post('/logout', validate(authValidation.logout), authController.logout);
router.post('/refresh-tokens', validate(authValidation.refreshTokens), authController.refreshTokens);

router
    .route('/grant/:userId')
    .post(auth('manageUsers'), validate(userValidation.getUser), authController.grantAdminAccess);

router
    .route('/revoke/:userId')
    .post(auth('manageUsers'), validate(userValidation.getUser), authController.revokeAdminAccess);

export default router;