import apiClient from '@/shared/utils/apiClient';

export type EmployeeStatus = 'Active' | 'On Leave' | 'Offline';

export type Employee = {
  _id: string;
  id?: string;
  name: string;
  email: string;
  role: string; // job title
  department: string; // department name
  status: EmployeeStatus;
  isActive: boolean;
};

export type ListEmployeesResponse = {
  employees: Employee[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

export type ListEmployeesParams = {
  page?: number;
  limit?: number;
  q?: string;
  isActive?: boolean;
};

export const listEmployeesApi = async (params: ListEmployeesParams): Promise<ListEmployeesResponse> => {
  const res = await apiClient.get('/employees', { params });
  return res.data as ListEmployeesResponse;
};

export type CreateEmployeeInput = {
  name: string;
  email: string;
  role?: string;
  department?: string;
  status?: EmployeeStatus;
};

export const createEmployeeApi = async (data: CreateEmployeeInput) => {
  const res = await apiClient.post('/employees', data);
  return res.data;
};

