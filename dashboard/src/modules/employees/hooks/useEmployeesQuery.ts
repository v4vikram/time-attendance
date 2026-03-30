import { useQuery } from "@tanstack/react-query";
import type { ListEmployeesParams } from "../types/employees.types";
import { listEmployeesApi } from "../api/employees.api";

export const useEmployeesQuery = ({ page, limit, q }: ListEmployeesParams) => {
    const query = useQuery({
      queryKey: ["employees", page, limit, q],
      queryFn: () => listEmployeesApi({ page, limit, q }),
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: false,
    });
  
    return {
      employees: query.data?.employees ?? [],
      total: query.data?.total ?? 0,
      totalPages: query.data?.totalPages ?? 1,
      isLoading: query.isLoading,
      error: query.error,
    };
  };