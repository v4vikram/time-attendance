import apiClient from '@/shared/utils/apiClient';
import type {
  AttendanceRecord,
  CreateAttendanceInput,
  ListAttendanceParams,
  ListAttendanceResponse,
  UpdateAttendanceInput,
} from '@/modules/attendance/types/attendance.types';

export const listAttendanceApi = async (
  params: ListAttendanceParams
): Promise<ListAttendanceResponse> => {
  const res = await apiClient.get('/attendance', { params });
  return res.data;
};

export const getTodayAttendanceApi = async (): Promise<AttendanceRecord | null> => {
  const res = await apiClient.get('/attendance/today');
  return res.data;
};

export const checkInAttendanceApi = async (isAutoCheckout = false): Promise<AttendanceRecord> => {
  const res = await apiClient.post('/attendance/checkin', { isAutoCheckout });
  return res.data;
};

export const checkOutAttendanceApi = async (isAutoCheckout = false): Promise<AttendanceRecord> => {
  const res = await apiClient.post('/attendance/checkout', { isAutoCheckout });
  return res.data;
};

export const pauseAttendanceApi = async (): Promise<AttendanceRecord> => {
  const res = await apiClient.post('/attendance/pause');
  return res.data;
};

export const resumeAttendanceApi = async (): Promise<AttendanceRecord> => {
  const res = await apiClient.post('/attendance/resume');
  return res.data;
};

export const createAttendanceApi = async (
  data: CreateAttendanceInput
) => {
  const res = await apiClient.post('/attendance', data);
  return res.data;
};

export const updateAttendanceApi = async (
  { id, ...data }: UpdateAttendanceInput
) => {
  const res = await apiClient.put(`/attendance/${id}`, data);
  return res.data;
};

export const deleteAttendanceApi = async (id: string) => {
  const res = await apiClient.delete(`/attendance/${id}`);
  return res.data;
};
