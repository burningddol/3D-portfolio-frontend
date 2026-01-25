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
  addOnFocusing: (name: string) => void;
  toggleOnFocusing: (name: string) => void;
  removeOnFocusing: (name: string) => void;
};

const INITIAL_FOCUSING: Record<string, boolean> = {
  "ToDo Schedular": false,
  "Junseok's Book": false,
  "My Blog": false,
  "Jabdori Time": false,
};

export const useFocusing = create<Focusing>((set) => ({
  onFocusing: INITIAL_FOCUSING,
  addOnFocusing(name: string) {
    set(() => ({ onFocusing: { ...INITIAL_FOCUSING, [name]: true } }));
  },
  toggleOnFocusing(name: string) {
    set((state) => ({
      onFocusing: { ...state.onFocusing, [name]: !state.onFocusing[name] },
    }));
  },
  removeOnFocusing(name: string) {
    set(() => ({ onFocusing: { ...INITIAL_FOCUSING, [name]: false } }));
  },
}));

export type APPName =
  | "ToDo Schedular"
  | "Junseok's Book"
  | "My Blog"
  | "Jabdori Time";

type APPList = {
  APPListOnNav: APPName[];
  addAPPListOnNav: (name: APPName) => void;
  removeAPPListOnNav: (name: APPName) => void;
};

export const useAPPListOnNav = create<APPList>((set) => ({
  APPListOnNav: [],
  addAPPListOnNav(name: APPName) {
    set((state) => ({
      APPListOnNav: [...state.APPListOnNav, name],
    }));
  },
  removeAPPListOnNav(name: APPName) {
    set((state) => ({
      APPListOnNav: state.APPListOnNav.filter((app) => app !== name),
    }));
  },
}));
