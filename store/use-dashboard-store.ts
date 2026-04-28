import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface DashboardState {
  selectedPurchaseId: string | null;
}

interface DashboardActions {
  setSelectedPurchaseId: (id: string | null) => void;
  clearSelectedPurchase: () => void;
}

type DashboardStore = DashboardState & DashboardActions;

export const useDashboardStore = create<DashboardStore>()(
  persist(
    (set) => ({
      selectedPurchaseId: null,

      setSelectedPurchaseId: (id) => set({ selectedPurchaseId: id }),
      clearSelectedPurchase: () => set({ selectedPurchaseId: null }),
    }),
    {
      name: "sit-with-dashboard",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
