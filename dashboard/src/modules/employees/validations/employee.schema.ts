// validations/employee.schema.ts
import { z } from "zod";

export const employeeSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  role: z.string().min(2, "Role is required"),
  department: z.string().min(2, "Department is required"),
  status: z.enum(["Active", "On Leave", "Offline"]),
});

export type EmployeeFormType = z.infer<typeof employeeSchema>;