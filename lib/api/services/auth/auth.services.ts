import { api } from "@/lib/axios";
import { getApiError } from "@/lib/utils";

export interface VerifyEmailResponse {
  user: {
    role: "ADMIN" | "USER";
  };
  message: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  token: string;
  email: string;
}

export interface GenericMessageResponse {
  message: string;
}

export const register = async (data: {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  try {
    const res = await api.post("/auth/register", data);
    return res.data;
  } catch (error) {
    console.log(error);

    throw new Error(getApiError(error));
  }
};

export const login = async (data: { email: string; password: string }) => {
  try {
    const res = await api.post("/auth/login", data);
    return res.data;
  } catch (error) {
    throw new Error(getApiError(error));
  }
};

export const getCurrentUser = async () => {
  try {
    const res = await api.get("/auth/me");
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const verifyEmail = async (token: string) => {
  if (!token) {
    throw new Error("Verification token is required.");
  }

  try {
    const res = await api.get(`/auth/verify-email?token=${token}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const resendVerification = async (data: {
  email: string;
}): Promise<GenericMessageResponse> => {
  if (!data.email) {
    throw new Error("Email is required to resend verification.");
  }

  try {
    const res = await api.post("/auth/resend-verification", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const forgotPassword = async (
  data: {email: string}
) => {
  try {
    const res = await api.post("/auth/forgot-password", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const resetPassword = async (
  data: {password: string, token: string}
) => {
  try {
    const res = await api.post("/auth/reset-password", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};

export const googleLogin = async (
  data: {idToken: string}
) => {
  try {
    const res = await api.post("/auth/google", data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw new Error(getApiError(error));
  }
};
