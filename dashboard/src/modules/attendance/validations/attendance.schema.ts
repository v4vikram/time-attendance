import { z } from 'zod';

export const attendanceSchema = z
  .object({
    employeeId: z.string().min(1, 'Employee is required'),
    date: z.string().min(1, 'Date is required'),
    checkIn: z.string().optional(),
    checkOut: z.string().optional(),
    remarks: z.string().max(500, 'Remarks must be 500 characters or less').optional(),
    isAutoCheckout: z.boolean().optional(),
  })
  .refine(
    (data) => !data.checkOut || Boolean(data.checkIn),
    {
      message: 'Check-in is required when check-out is provided',
      path: ['checkOut'],
    }
  );

export type AttendanceFormType = z.infer<typeof attendanceSchema>;
