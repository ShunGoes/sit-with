import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface PlatformSettings {
  platformName: string;
  supportEmail: string;
  defaultTimezone: string;
  currency: string;
  maintenanceMode: boolean;
  allowUserRegistration: boolean;
  requireEmailVerification: boolean;
}

interface PlatformSettingsState {
  settings: PlatformSettings | null;
}

interface PlatformSettingsActions {
  setSettings: (settings: PlatformSettings) => void;
  updateSettings: (partial: Partial<PlatformSettings>) => void;
  clearSettings: () => void;
}

type PlatformSettingsStore = PlatformSettingsState & PlatformSettingsActions;

const initialState: PlatformSettingsState = {
  settings: null,
};

export const usePlatformSettingsStore = create<PlatformSettingsStore>()(
  persist(
    (set) => ({
      ...initialState,

      setSettings: (settings) =>
        set(() => ({
          settings,
        })),

      updateSettings: (partial) =>
        set((state) => ({
          settings: state.settings ? { ...state.settings, ...partial } : null,
        })),

      clearSettings: () => set(initialState),
    }),
    {
      name: "sit-with-platform-settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
