import apiClient from '@/shared/utils/apiClient';

export type User = {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  name: string;
};

export const loginApi = async (credentials: any) => {
  return apiClient.post('/auth/login', credentials);
};

export const registerApi = async (data: any) => {
  return apiClient.post('/auth/register', data);
};

export const getMeApi = async (): Promise<{ user: User }> => {
  return apiClient.get('/auth/me');
};
