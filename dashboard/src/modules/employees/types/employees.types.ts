// ==============================
// Enums / Constants
// ==============================

export type EmployeeStatus = 'Active' | 'On Leave' | 'Offline';

// ==============================
// Core Entity (Single Source of Truth)
// ==============================

export interface Employee {
  _id: string; // from MongoDB
  name: string;
  email: string;
  role?: string;
  department?: string;
  status: EmployeeStatus;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// ==============================
// API Response Types
// ==============================

export interface ListEmployeesResponse {
  employees: Employee[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

// ==============================
// Query Params Types
// ==============================

export interface ListEmployeesParams {
  page?: number;
  limit?: number;
  q?: string; // search query
  isActive?: boolean;
}

// ==============================
// Mutation Input Types
// ==============================

// Reusable base (DRY approach)
export interface EmployeeBaseInput {
  name: string;
  email: string;
  role?: string;
  department?: string;
  status?: EmployeeStatus;
}

// Create
export type CreateEmployeeInput = EmployeeBaseInput;

// Update
export interface UpdateEmployeeInput extends EmployeeBaseInput {
  id: string;
}