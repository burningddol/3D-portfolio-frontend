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

type Control = {
  onControl: boolean;
  setOnControl: (isActive: boolean) => void;
};

export const useControlOrbit = create<Control>((set) => ({
  onControl: false,
  setOnControl(isActive: boolean) {
    set(() => ({ onControl: isActive }));
  },
}));

type Setting = {
  isSetting: boolean;
  setIsSetting: (isActive: boolean) => void;
};

export const useSetting = create<Setting>((set) => ({
  isSetting: false,
  setIsSetting(isActive: boolean) {
    set(() => ({ isSetting: isActive }));
  },
}));

type ZIndexState = {
  top: number;
  next: () => number;
};

export const useZIndex = create<ZIndexState>((set, get) => ({
  top: 1,
  next: () => {
    const nextZ = get().top + 1;
    set({ top: nextZ });
    return nextZ;
  },
}));

type Focusing = {
  onFocusing: Record<string, boolean>;
  setOnFocusing: (name: string) => void;
};

const INITIAL_FOCUSING: Record<string, boolean> = {
  toDo: false,
  junseokBook: false,
};

export const useFocusing = create<Focusing>((set) => ({
  onFocusing: INITIAL_FOCUSING,
  setOnFocusing(name: string) {
    set(() => ({ onFocusing: { ...INITIAL_FOCUSING, [name]: true } }));
  },
}));
