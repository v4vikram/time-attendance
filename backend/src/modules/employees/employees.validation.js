import { z } from 'zod';
import mongoose from 'mongoose';

const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), 'Invalid ObjectId');

export const employeeStatusEnum = z.enum(['Active', 'On Leave', 'Offline']);

export const createEmployeeSchema = z.object({
  body: z.object({
    name: z.string({ required_error: 'Name is required' }).min(2, 'Name must be at least 2 characters'),
    email: z.string({ required_error: 'Email is required' }).email('Invalid email address'),
    // Frontend modal doesn't collect passwords; backend will auto-generate if omitted.
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    role: z.string().optional(), // Job title (frontend field name)
    department: z.string().optional(), // Department name (frontend field name)
    status: employeeStatusEnum.optional().default('Active'),
  }),
});

export const listEmployeesSchema = z.object({
  query: z.object({
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(10),
    // Optional filtering
    isActive: z.coerce.boolean().optional(),
    q: z.string().optional(),
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
    role: z.string().optional(),
    department: z.string().optional(),
    status: employeeStatusEnum.optional(),
    isActive: z.boolean().optional(),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
  }),
});

export const deleteEmployeeSchema = z.object({
  params: z.object({
    id: objectIdSchema,
  }),
});

