import { Router } from 'express';
import { protect } from '../../middlewares/auth.middleware.js';
import { validate } from '../../middlewares/validate.middleware.js';
import {
  createAttendance,
  listAttendances,
  getAttendance,
  getTodayAttendance,
  checkInToday,
  checkOutToday,
  updateAttendance,
  deleteAttendance,
} from './attendance.controller.js';
import {
  createAttendanceSchema,
  updateAttendanceSchema,
  attendanceQuerySchema,
  attendanceIdSchema,
} from './attendance.validation.js';

const router = Router();

router.use(protect);
router.get('/today', getTodayAttendance);
router.post('/checkin', checkInToday);
router.post('/checkout', checkOutToday);
router.post('/',  createAttendance);
router.get('/',  listAttendances);
router.get('/:id',  getAttendance);
router.put('/:id',  updateAttendance);
router.delete('/:id', deleteAttendance);

export default router;
