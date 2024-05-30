import { create } from "zustand";

export type Type = "entry" | "editor";

interface modalStoreType {
  entry: boolean;
  editor: boolean;
  actions: {
    setModalOpen: (type: Type) => void;
  };
}

const useModalStore = create<modalStoreType>((set) => ({
  entry: false,
  editor: false,
  actions: {
    setModalOpen: (type) => {
      set((state) => ({ ...state, [type]: !state[type] }));
    },
  },
}));

export const useEntryModalState = () => useModalStore((state) => state.entry);
export const useEditorModalState = () => useModalStore((state) => state.editor);

// 🎉  모든 action을 위한 하나의 selector
export const useModalActions = () => useModalStore((state) => state.actions);
