import { create } from "zustand";

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  isEmailVerified: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  authMethod: "google" | "email" | null;
}

interface AuthActions {
  setUser: (
    user: AuthUser,
    authMethod: "google" | "email"
  ) => void;
  clearUser: () => void;
  setUserEmailVerified: (verified: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  authMethod: null,
};

export const useAuthStore = create<AuthStore>((set) => ({
  ...initialState,

  setUser: (user, authMethod) =>
    set({
      user: {
        ...user,
        isEmailVerified: authMethod === "google" ? true : user.isEmailVerified,
      },
      isAuthenticated: true,
      authMethod,
    }),

  clearUser: () => set(initialState),

  setUserEmailVerified: (verified) =>
    set((state) => ({
      user: state.user ? { ...state.user, isEmailVerified: verified } : null,
    })),
}));
