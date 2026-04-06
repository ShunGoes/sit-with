import { create } from "zustand";
import { ReactNode } from "react";

interface ModalOptions {
  className?: string;
  variant?: "default" | "lightbox";
  isMutation?: boolean;
}

interface Modal {
  id: string;
  content: ReactNode;
  options?: ModalOptions;
}

interface ModalStore {
  modals: Modal[];
  openModal: (id: string, content: ReactNode, options?: ModalOptions) => void;
  closeModal: (id: string) => void;
  closeAll: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  modals: [],
  openModal: (id, content, options) =>
    set((state) => ({
      modals: [...state.modals, { id, content, options }],
    })),
  closeModal: (id) =>
    set((state) => ({
      modals: state.modals.filter((modal) => modal.id !== id),
    })),
  closeAll: () => set({ modals: [] }),
}));
