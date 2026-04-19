import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

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
  token: string | null;
  isAuthenticated: boolean;
  authMethod: "google" | "email" | null;
}

interface AuthActions {
  setUser: (user: AuthUser, authMethod: "google" | "email", token?: string) => void;
  clearUser: () => void;
  setUserEmailVerified: (verified: boolean) => void;
}

type AuthStore = AuthState & AuthActions;

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  authMethod: null,
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      ...initialState,

      setUser: (user, authMethod, token) =>
        set((state) => ({
          user: {
            ...user,
            isEmailVerified:
              authMethod === "google" ? true : user.isEmailVerified,
          },
          token: token ?? state.token,
          isAuthenticated: true,
          authMethod,
        })),

      clearUser: () => set(initialState),

      setUserEmailVerified: (verified) =>
        set((state) => ({
          user: state.user ? { ...state.user, isEmailVerified: verified } : null,
          isAuthenticated: verified ? true : state.isAuthenticated,
        })),
    }),
    {
      name: "sit-with-auth",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
