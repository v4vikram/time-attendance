import { Router } from 'express';
import authRoutes from '../modules/auth/auth.routes.js';
import employeesRoutes from '../modules/employees/employees.routes.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/employees', employeesRoutes);

export default router;
