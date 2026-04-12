"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  login,
  getCurrentUser,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  register,
  googleLogin,
} from "../../services/auth/auth.services";
import { showErrorToast, showSuccessToast } from "@/lib/toast-helpers";
import { useAuthStore } from "@/store/use-auth-store";
import { useEffect } from "react";

// helps user log in
export const useRegister = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: register,
    onSuccess: (data: any) => {
      showSuccessToast(data.message);
      setUser(data.data.user, "email");
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};

// helps user log in
export const useSignin = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: login,
    onSuccess: (data: any) => {
      showSuccessToast(data.message);
      setUser(data.data.user, "email");
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
    onError: (error: any) => {
      showErrorToast(error.message);
    },
  });
};



// resend verification email if previous one became invalid or expired
export const useResendVerification = () => {
  return useMutation({
    mutationFn: resendVerification,
    onSuccess: (data) => {
      showSuccessToast(data.message);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
};

// takes the users email to generate an otp that would be sent to the uer's inbox
export const useForgotPassword = () => {
  return useMutation({
    mutationFn: forgotPassword,
    onSuccess: (data) => {
      showSuccessToast(data.message);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPassword,
    onSuccess: (data) => {
      showSuccessToast(data.message);
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
};

export const useGoogleLogin = () => {
  const queryClient = useQueryClient();
  const setUser = useAuthStore((state) => state.setUser);
  
  return useMutation({
    mutationFn: googleLogin,
    onSuccess: (data) => {
      showSuccessToast(data.message);
      setUser(data.data.user, "google");
      queryClient.invalidateQueries({ queryKey: ["auth", "user"] });
    },
    onError: (error) => {
      showErrorToast(error.message);
    },
  });
};

// get the currently logged in user and set it in the auth store. This is used to persist the user session across page reloads and to check the user's authentication status when the app loads. If the user is not authenticated, we clear the user from the auth store.
export const useGetCurrentUser = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearUser = useAuthStore((state) => state.clearUser);

  const query = useQuery({
    queryKey: ["auth", "user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  useEffect(() => {
    if (query.isSuccess && query.data?.data) {
      setUser(query.data?.data, "email");
    } else if (query.isError) {
      clearUser();
    }
  }, [query.isSuccess, query.isError, query.data, setUser, clearUser]);

  return query;
};
