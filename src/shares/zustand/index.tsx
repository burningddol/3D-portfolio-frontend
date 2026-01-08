import { create } from "zustand";

type Desktop = {
  onDesktop: boolean;
  setOnDesktop: (isActive: boolean) => void;
};

export const useDesktop = create<Desktop>((set) => ({
  onDesktop: false,
  setOnDesktop(isActive: boolean) {
    set(() => ({ onDesktop: isActive }));
  },
}));

type Hover = {
  isHovered: boolean;
  setIsHovered: (isActive: boolean) => void;
};

export const useHover = create<Hover>((set) => ({
  isHovered: false,
  setIsHovered(isActive: boolean) {
    set(() => ({ isHovered: isActive }));
  },
}));

type Project = {
  onProject: boolean;
  setOnProject: (isActive: boolean) => void;
};

export const useProject = create<Project>((set) => ({
  onProject: false,
  setOnProject(isActive: boolean) {
    set(() => ({ onProject: isActive }));
  },
}));
