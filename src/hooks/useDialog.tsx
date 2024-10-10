import { create } from "zustand";

export type DialogState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDialog = create<DialogState>((set) => ({
  isOpen: true,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
