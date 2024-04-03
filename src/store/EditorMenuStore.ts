import { create } from "zustand";


interface personMenuType {
  chat: boolean;
  personnel: boolean;
}

interface  useEditorMenuStoreType {
  personMenu: personMenuType;
  actions : {
    setPersonMenu: (menu: keyof personMenuType) => void;
  }
}



 const useEditorMenuStore = create<useEditorMenuStoreType>((set) => ({

  personMenu: {
    chat: false,
    personnel: false,
  },

  actions : { 
 
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

export const usePersonMenuState= () => useEditorMenuStore((state) => state.personMenu)



export const  useEditorMenuActions = () =>  useEditorMenuStore((state) => state.actions)