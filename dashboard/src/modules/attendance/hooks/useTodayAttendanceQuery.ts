import { useQuery } from '@tanstack/react-query';
import { getTodayAttendanceApi } from '@/modules/attendance/api/attendance.api';
import type { AttendanceRecord } from '@/modules/attendance/types/attendance.types';

export const useTodayAttendanceQuery = () => {
  const query = useQuery({
    queryKey: ['attendance', 'today'],
    queryFn: () => getTodayAttendanceApi(),
    staleTime: 1000 * 30,
    refetchOnWindowFocus: false,
  });

  return {
    attendance: query.data as AttendanceRecord | null,
    isLoading: query.isLoading,
    error: query.error,
    refetch: query.refetch,
  };
};
