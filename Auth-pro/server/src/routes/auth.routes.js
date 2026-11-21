import { Router } from 'express';
import { userRegisterContoller, userGetDataContoller, refreshTokenController } from '../controllers/auth.controller.js';

const router = Router();

/**
 * @POST /user/register
 */
router.post('/register', userRegisterContoller);

/**
 * @GET /user/me
 */
router.get('/me', userGetDataContoller);

/**
 * @POST /user/refresh
 */
router.post('/refresh', refreshTokenController);


export default router;