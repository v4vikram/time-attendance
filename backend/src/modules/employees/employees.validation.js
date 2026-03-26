import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), 'Invalid ObjectId');

export const createEmployeeSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    password: z.string({ required_error: 'Password is required' }).min(6, 'Password must be at least 6 characters'),
    departmentId: objectIdSchema.optional(),
    shiftId: objectIdSchema.optional(),
    isActive: z.boolean().optional().default(true),
  }),
});

export const listEmployeesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    // Optional filtering, e.g. ?isActive=true
    isActive: z.coerce.boolean().optional(),
  }),
});

export const getEmployeeSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

export const updateEmployeeSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
  body: z.object({
    name: z.string().min(2, 'Name must be at least 2 characters').optional(),
    email: z.string().email('Invalid email address').optional(),
    departmentId: objectIdSchema.optional(),
    shiftId: objectIdSchema.optional(),
    isActive: z.boolean().optional(),
  }),
});

export const deleteEmployeeSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

