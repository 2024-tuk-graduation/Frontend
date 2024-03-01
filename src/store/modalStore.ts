import { create } from "zustand";

export type Type =  'entry';

interface modalStoreType {

  entry : boolean
  actions : {
    setModalOpen: (type : Type) => void;
  }
}


 const useModalStore = create<modalStoreType>((set) => ({
  entry : false,
  actions : { 
     setModalOpen: (type) => {
      set((state) => ({ ...state, [type]: !state[type] }));
    },
  },

}));

export const useEntryModalState= () => useModalStore((state) => state.entry)

// 🎉  모든 action을 위한 하나의 selector
export const  useModalActions = () => useModalStore((state) => state.actions)