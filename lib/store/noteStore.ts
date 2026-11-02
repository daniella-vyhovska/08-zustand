import { create } from "zustand";
import { persist } from "zustand/middleware";

const initialDraft = {
  title: "",
  content: "",
  tag: "Todo",
};

interface NoteDraft {
  title: string;
  content: string;
  tag: string;
}

interface NoteStore {
  draft: NoteDraft;
  setDraft: (note: Partial<NoteDraft>) => void;
  clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
  persist(
    (set) => ({
      draft: initialDraft,

      setDraft: (note) =>
        set((state) => ({
          draft: {
            ...state.draft, // зберігаємо попередні значення
            ...note,        // оновлюємо лише змінене поле
          },
        })),

      clearDraft: () => set({ draft: initialDraft }),
    }),

    {
      name: "note-draft", // ключ у localStorage

      // зберігаємо лише draft, без методів
      partialize: (state) => ({
        draft: state.draft,
      }),
    }
  )
);
