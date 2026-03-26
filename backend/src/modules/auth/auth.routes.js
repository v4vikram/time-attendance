import { Router } from 'express';
import { register, login, getMe, logout } from './auth.controller.js';
import { protect } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import { registerSchema, loginSchema } from './auth.validation.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.get('/me', protect, getMe);
router.get('/logout', protect, logout);

export default router;
