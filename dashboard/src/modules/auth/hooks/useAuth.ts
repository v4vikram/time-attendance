import { useMutation, useQuery } from '@tanstack/react-query';
import { loginApi, registerApi, getMeApi, logoutApi } from '@/modules/auth/services/auth.api';
import { useQueryClient } from '@tanstack/react-query';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const userQuery = useQuery({
    queryKey: ['authUser'],
    queryFn: getMeApi,
    staleTime: 0,
    retry: 0,
  });

  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['authUser'], data.user);
    },
  });
  const registerMutation = useMutation({
    mutationFn: registerApi,
    onSuccess: (data) => {
      queryClient.setQueryData(['authUser'], data.user);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.setQueryData(['authUser'], null);
    },
  });

  return {
    user: userQuery.data,
    isLoading: userQuery.isLoading,

    login: loginMutation.mutateAsync,
    register: registerMutation.mutateAsync,
    logout: logoutMutation.mutateAsync,
  };
};