import { useQuery } from '@tanstack/react-query';
import type { ListAttendanceParams } from '@/modules/attendance/types/attendance.types';
import { listAttendanceApi } from '@/modules/attendance/api/attendance.api';

export const useAttendanceQuery = ({
  page,
  limit,
  employeeId,
  from,
  to,
}: ListAttendanceParams) => {
  const query = useQuery({
    queryKey: ['attendance', page, limit, employeeId, from, to],
    queryFn: () =>
      listAttendanceApi({
        page,
        limit,
        employeeId,
        from,
        to,
      }),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return {
    attendances: query.data?.attendances ?? [],
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 1,
    isLoading: query.isLoading,
    error: query.error,
  };
};
