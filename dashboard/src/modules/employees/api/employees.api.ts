// employees.api.ts
import apiClient from '@/shared/utils/apiClient';
import type { 
  ListEmployeesParams, 
  ListEmployeesResponse, 
  CreateEmployeeInput, 
  UpdateEmployeeInput 
} from '@/modules/employees/types/employees.types';

/**
 * Fetch a paginated list of employees
 */
export const listEmployeesApi = async (params: ListEmployeesParams): Promise<ListEmployeesResponse> => {
  const res = await apiClient.get('/employees', { params });
  return res.data;
};

/**
 * Create a new employee
 */
export const createEmployeeApi = async (data: CreateEmployeeInput) => {
  const res = await apiClient.post('/employees', data);
  return res.data;
};

/**
 * Update an existing employee
 */
export const updateEmployeeApi = async ({ id, ...data }: UpdateEmployeeInput) => {
  // We extract 'id' to use in the URL and spread the rest into the body
  const res = await apiClient.put(`/employees/${id}`, data);
  return res.data;
};

/**
 * Delete an employee
 */
export const deleteEmployeeApi = async (id: string) => {
  const res = await apiClient.delete(`/employees/${id}`);
  return res.data;
};