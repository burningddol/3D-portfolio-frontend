import { create } from "zustand";
import { type APPName, INITIAL_APP_STATUS } from "@/shares/types";

/**
 * Boolean 상태를 관리하는 제네릭 스토어 타입
 */
type BooleanStore<K extends string> = {
  [key in K]: boolean;
} & {
  [key in `set${Capitalize<K>}`]: (isActive: boolean) => void;
};

// Desktop 상태
export const useDesktop = create<BooleanStore<"onDesktop">>((set) => ({
  onDesktop: false,
  setOnDesktop(isActive: boolean) {
    set(() => ({ onDesktop: isActive }));
  },
}));

// Hover 상태
export const useHover = create<BooleanStore<"isHovered">>((set) => ({
  isHovered: false,
  setIsHovered(isActive: boolean) {
    set(() => ({ isHovered: isActive }));
  },
}));

// Project 상태
export const useProject = create<BooleanStore<"onProject">>((set) => ({
  onProject: false,
  setOnProject(isActive: boolean) {
    set(() => ({ onProject: isActive }));
  },
}));

// Control 상태
export const useControlOrbit = create<BooleanStore<"onControl">>((set) => ({
  onControl: false,
  setOnControl(isActive: boolean) {
    set(() => ({ onControl: isActive }));
  },
}));

// Setting 상태
export const useSetting = create<BooleanStore<"isSetting">>((set) => ({
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

type FocusingState = {
  onFocusing: Record<APPName, boolean>;
  addOnFocusing: (name: APPName) => void;
  toggleOnFocusing: (name: APPName) => void;
  removeOnFocusing: (name: APPName) => void;
};

export const useFocusing = create<FocusingState>((set) => ({
  onFocusing: INITIAL_APP_STATUS,
  addOnFocusing(name: APPName) {
    set(() => ({ onFocusing: { ...INITIAL_APP_STATUS, [name]: true } }));
  },
  toggleOnFocusing(name: APPName) {
    set((state) => ({
      onFocusing: { ...state.onFocusing, [name]: !state.onFocusing[name] },
    }));
  },
  removeOnFocusing(name: APPName) {
    set(() => ({ onFocusing: { ...INITIAL_APP_STATUS, [name]: false } }));
  },
}));

// APPName은 @/shares/types에서 re-export
export type { APPName } from "@/shares/types";

type APPListState = {
  APPListOnNav: APPName[];
  addAPPListOnNav: (name: APPName) => void;
  removeAPPListOnNav: (name: APPName) => void;
};

export const useAPPListOnNav = create<APPListState>((set) => ({
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
