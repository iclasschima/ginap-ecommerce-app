import { useMutation } from "@tanstack/react-query";
import { login, register } from "../api/auth.api";

export const useLogin = (options = {}) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: login,
    ...options,
  });

  return { isLoading, mutate };
};

export const useRegistration = (options = {}) => {
  const { isLoading, mutate } = useMutation({
    mutationFn: register,
    ...options,
  });

  return { isLoading, mutate };
};
