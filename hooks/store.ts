import { MAX_FREE_COUNTS } from "@/lib/serverConstant";
import { create } from "zustand";

export interface ProModalStore {
  isOpen?: boolean;
}

export interface FreeCounterStore {
  isPro?: boolean;
  apiLimitCount: number;
}

export const useProModalStore = create<ProModalStore>((set) => ({
  isOpen: false,
}));
export const useFreeCounterStore = create<FreeCounterStore>((set) => ({
  isPro: false,
  apiLimitCount: 0,
}));
