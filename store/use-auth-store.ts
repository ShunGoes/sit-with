import { create } from "zustand";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  authMethod: "google" | "email" | null;
  isEmailVerified: boolean;
}

interface AuthActions {
  setUser: (
    user: AuthUser,
    authMethod: "google" | "email",
    isEmailVerified: boolean
  ) => void;
  clearUser: () => void;
  setEmailVerified: (verified: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authMethod: null,
  isEmailVerified: false,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  setUser: (user, authMethod, isEmailVerified) =>
    set({
      user,
      isAuthenticated: true,
      authMethod,
      isEmailVerified: authMethod === "google" ? true : isEmailVerified,
    }),

  clearUser: () => set(initialState),

  setEmailVerified: (verified) => set({ isEmailVerified: verified }),
}));
