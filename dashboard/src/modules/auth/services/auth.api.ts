import apiClient from '@/shared/utils/apiClient';

export type User = {
  id: string;
  email: string;
  role: 'admin' | 'employee';
  name: string;
};

type ApiResponse<T> = {
  data: T;
};

type AuthUserResponse = {
  user: User;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
};

export type ForgotPasswordPayload = {
  email: string;
};

export type ResetPasswordPayload = {
  token: string;
  password: string;
};

export const loginApi = async (credentials: LoginPayload) => {
  const res = (await apiClient.post('/auth/login', credentials)) as ApiResponse<AuthUserResponse>;
  return res.data;
};

export const registerApi = async (data: RegisterPayload) => {
  const res = (await apiClient.post('/auth/register', data)) as ApiResponse<AuthUserResponse>;
  return res.data;
};

export const getMeApi = async (): Promise<User> => {
  const res = (await apiClient.get('/auth/me')) as ApiResponse<AuthUserResponse>;
  return res.data.user;
};

export const logoutApi = async () => {
  return apiClient.get('/auth/logout');
};

export const forgotPasswordApi = async (data: ForgotPasswordPayload) => {
  return apiClient.post('/auth/forgot-password', data);
};

export const resetPasswordApi = async (data: ResetPasswordPayload) => {
  return apiClient.post('/auth/reset-password', data);
};
