import { create } from "zustand";

interface DraftState {
  title: string;
  content: string;
  setTitle: (value: string) => void;
  setContent: (value: string) => void;
  reset: () => void;
}

export const useDraftStore = create<DraftState>((set) => ({
  title: "",
  content: "",
  setTitle: (value) => set({ title: value }),
  setContent: (value) => set({ content: value }),
  reset: () => set({ title: "", content: "" }),
}));
