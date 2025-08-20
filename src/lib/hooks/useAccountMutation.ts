import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import type { LoginResponse, RegisterUser } from "../api/account";
import type { LoginParams } from "../api/account";
import { loginApi, registerUser } from "../api/account";



interface UseLoginOptions {
    onSuccess?: (data: LoginResponse) => void;
    onError?: (error: AxiosError<{ message: string }>) => void;
  }

  export const useLoginMutation = ({ onSuccess, onError }: UseLoginOptions = {}) => {
    return useMutation<LoginResponse, AxiosError<{ message: string }>, LoginParams>({
      mutationFn: loginApi,
      onSuccess,
      onError,
    });
  };

  
type RegisterResponse = {
  message: string;
  token: string;
  account: {
    userId: number;
    username: string;
    email: string;
  };
};

type ErrorResponse = {
  message: string
}


export const useRegisterMutation = (
  options?: {
    onSuccess?: (data: RegisterResponse) => void
    onError?: (error: AxiosError<ErrorResponse>) => void
  }
) => {
  return useMutation<RegisterResponse, AxiosError<ErrorResponse>, RegisterUser>({
    mutationFn: registerUser,
    onSuccess: (data) => {
      if (options?.onSuccess) options.onSuccess(data)
       
    },
    onError: (error) => {
      if (options?.onError) options.onError(error)
    },
  })
}