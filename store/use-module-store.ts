import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface ModuleState {
  // moduleId -> "started" | "completed"
  moduleStatuses: Record<string, "started" | "completed">;
}

interface ModuleActions {
  startModule: (moduleId: string) => void;
  completeModule: (moduleId: string) => void;
  getModuleStatus: (moduleId: string) => "not-started" | "started" | "completed";
}

type ModuleStore = ModuleState & ModuleActions;

export const useModuleStore = create<ModuleStore>()(
  persist(
    (set, get) => ({
      moduleStatuses: {},

      startModule: (moduleId) =>
        set((state) => ({
          moduleStatuses: {
            ...state.moduleStatuses,
            // Only set to started if not already completed
            [moduleId]: state.moduleStatuses[moduleId] === "completed" ? "completed" : "started",
          },
        })),

      completeModule: (moduleId) =>
        set((state) => ({
          moduleStatuses: {
            ...state.moduleStatuses,
            [moduleId]: "completed",
          },
        })),

      getModuleStatus: (moduleId) => {
        const status = get().moduleStatuses[moduleId];
        if (!status) return "not-started";
        return status;
      },
    }),
    {
      name: "sit-with-modules",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
