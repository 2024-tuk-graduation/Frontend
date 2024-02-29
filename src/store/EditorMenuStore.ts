import { create } from "zustand";


interface personMenuType {
  chat: boolean;
  personnel: boolean;
}

interface  useEditorMenuStoreType {
  personMenu: personMenuType;
  compileMenu : boolean
  actions : {
    setCompileMenu: () => void;
    setPersonMenu: (menu: keyof personMenuType) => void;
  }
}



 const useEditorMenuStore = create<useEditorMenuStoreType>((set) => ({
  compileMenu: false,
  personMenu: {
    chat: false,
    personnel: false,
  },

  actions : { 
    setCompileMenu: () => set((state) => ({ compileMenu: !state.compileMenu })),
    setPersonMenu: (menu) =>
    set((state) => ({
      personMenu: {
        chat: false,
          personnel: false,
        [menu]: !state.personMenu[menu],
      },
    })),
  },

}));

export const useCompileMenuState= () => useEditorMenuStore((state) => state.compileMenu)
export const usePersonMenuState= () => useEditorMenuStore((state) => state.personMenu)



export const  useEditorMenuActions = () =>  useEditorMenuStore((state) => state.actions)