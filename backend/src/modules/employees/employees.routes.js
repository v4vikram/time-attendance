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

// Only admins can manage employees.
router.use(protect, restrictTo('admin'));

router.post('/', validate(createEmployeeSchema), createEmployee);
router.get('/', validate(listEmployeesSchema), getEmployees);
router.get('/:id', validate(getEmployeeSchema), getEmployeeById);
router.put('/:id', validate(updateEmployeeSchema), updateEmployee);
router.delete('/:id', validate(deleteEmployeeSchema), deleteEmployee);

export default router;

