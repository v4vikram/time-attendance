import { z } from 'zod';

const objectId = z.preprocess((value) => {
  if (!value) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  return value;
}, z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId'));

const dateString = z.preprocess((value) => {
  if (!value) return undefined;
  if (typeof value === 'string' && value.trim() === '') return undefined;
  if (value instanceof Date) return value;
  return new Date(value);
}, z.date());

export const createAttendanceSchema = z.object({
  body: z.object({
    employeeId: objectId,
    date: dateString.optional(),
    checkIn: dateString.optional(),
    checkOut: dateString.optional(),
    isAutoCheckout: z.boolean().optional(),
    status: z.enum(['present', 'absent', 'on_leave', 'remote']).optional(),
    remarks: z.string().max(500).optional(),
  }),
});

export const updateAttendanceSchema = z.object({
  params: z.object({
    id: objectId,
  }),
  body: z.object({
    date: dateString.optional(),
    checkIn: dateString.optional(),
    checkOut: dateString.optional(),
    isAutoCheckout: z.boolean().optional(),
    status: z.enum(['present', 'absent', 'on_leave', 'remote']).optional(),
    remarks: z.string().max(500).optional(),
  }),
});

export const attendanceQuerySchema = z.object({
  query: z.object({
    employeeId: objectId.optional(),
    from: dateString.optional(),
    to: dateString.optional(),
    page: z.string().regex(/^[0-9]+$/).optional(),
    limit: z.string().regex(/^[0-9]+$/).optional(),
  }),
});

export const attendanceIdSchema = z.object({
  params: z.object({
    id: objectId,
  }),
});
