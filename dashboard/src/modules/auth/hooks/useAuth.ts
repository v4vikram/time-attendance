import { useMutation, useQuery } from '@tanstack/react-query';
import { loginApi, registerApi, getMeApi } from '@/modules/auth/services/auth.api';
import { useAuthContext } from '@/context/AuthContext';

export const useLogin = () => {
  const { setUser } = useAuthContext();
  
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data: any) => {
      // Assuming the API returns the user object in data.user
      setUser(data.user);
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: registerApi,
  });
};

export const useAuthUser = () => {
  return useQuery({
    queryKey: ['authUser'],
    queryFn: getMeApi,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 0,
  });
};
