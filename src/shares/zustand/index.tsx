import { create } from "zustand";

type StoreState = {
  onDesktop: boolean;
  setOnDesktop: (isActive: boolean) => void;
};

export const useDesktop = create<StoreState>((set) => ({
  onDesktop: false,
  setOnDesktop(isActive: boolean) {
    set(() => ({ onDesktop: isActive }));
  },
}));
