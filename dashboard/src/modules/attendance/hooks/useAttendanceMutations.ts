import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createAttendanceApi,
  deleteAttendanceApi,
  updateAttendanceApi,
  checkInAttendanceApi,
  checkOutAttendanceApi,
} from '@/modules/attendance/api/attendance.api';

export const useAttendanceMutations = () => {
  const queryClient = useQueryClient();

  const invalidateAttendance = () => {
    queryClient.invalidateQueries({ queryKey: ['attendance'] });
    queryClient.invalidateQueries({ queryKey: ['attendance', 'today'] });
  };

  const createMutation = useMutation({
    mutationFn: createAttendanceApi,
    onSuccess: invalidateAttendance,
  });

  const updateMutation = useMutation({
    mutationFn: updateAttendanceApi,
    onSuccess: invalidateAttendance,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteAttendanceApi,
    onSuccess: invalidateAttendance,
  });

  const checkInMutation = useMutation({
    mutationFn: checkInAttendanceApi,
    onSuccess: invalidateAttendance,
  });

  const checkOutMutation = useMutation({
    mutationFn: checkOutAttendanceApi,
    onSuccess: invalidateAttendance,
  });

  return {
    createAttendance: createMutation.mutate,
    updateAttendance: updateMutation.mutate,
    deleteAttendance: deleteMutation.mutate,
    checkIn: checkInMutation.mutate,
    checkOut: checkOutMutation.mutate,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isCheckingIn: checkInMutation.isPending,
    isCheckingOut: checkOutMutation.isPending,
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
    checkInError: checkInMutation.error,
    checkOutError: checkOutMutation.error,
  };
};
