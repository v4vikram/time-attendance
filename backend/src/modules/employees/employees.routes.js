import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware.js';
import { restrictTo } from '../../middlewares/role.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';

import {
  createEmployeeSchema,
  listEmployeesSchema,
  getEmployeeSchema,
  updateEmployeeSchema,
  deleteEmployeeSchema,
} from './employees.validation.js';
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from './employees.controller.js';

const router = Router();

// Auth required for all employee endpoints.
// Admin can create/update/delete; both admin and employee can view.
router.get('/', protect, restrictTo('admin', 'employee'), validate(listEmployeesSchema), getEmployees);
router.get('/:id', protect, restrictTo('admin', 'employee'), validate(getEmployeeSchema), getEmployeeById);

router.post('/', protect, restrictTo('admin'), validate(createEmployeeSchema), createEmployee);
router.put('/:id', protect, restrictTo('admin'), validate(updateEmployeeSchema), updateEmployee);
router.delete('/:id', protect, restrictTo('admin'), validate(deleteEmployeeSchema), deleteEmployee);

export default router;

