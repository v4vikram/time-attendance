// hooks/useEmployeeMutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEmployeeApi,
  updateEmployeeApi,
  deleteEmployeeApi,
} from "../api/employees.api";


export const useEmployeeMutations = () => {
  const queryClient = useQueryClient();

  // 🔹 CREATE
  const createMutation = useMutation({
    mutationFn: createEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // 🔹 UPDATE
  const updateMutation = useMutation({
    mutationFn: updateEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  // 🔹 DELETE
  const deleteMutation = useMutation({
    mutationFn: deleteEmployeeApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
    },
  });

  return {
    // actions
    createEmployee: createMutation.mutate,
    updateEmployee: updateMutation.mutate,
    deleteEmployee: deleteMutation.mutate,

    // loading states
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,

    // errors (optional)
    createError: createMutation.error,
    updateError: updateMutation.error,
    deleteError: deleteMutation.error,
  };
};
