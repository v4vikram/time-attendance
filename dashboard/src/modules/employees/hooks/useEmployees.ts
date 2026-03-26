import { useQuery } from "@tanstack/react-query";
import { listEmployeesApi } from "../services/employees.api";

interface Params {
  page: number;
  limit: number;
  q?: string;
}

export const useEmployees = ({ page, limit, q }: Params) => {
  const query = useQuery({
    queryKey: ["employees", page, limit, q],
    queryFn: () =>
      listEmployeesApi({
        page,
        limit,
        q,
      }),
    keepPreviousData: true, // 🔥 important for pagination smooth UX
  });

  return {
    employees: query.data?.employees ?? [],
    total: query.data?.total ?? 0,
    totalPages: query.data?.totalPages ?? 1,
    isLoading: query.isLoading,
  };
};