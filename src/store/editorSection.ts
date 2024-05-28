import { create } from "zustand";


interface editorSectionStoreType {
  height : number;
  actions : {
    setHeight:(newState:number)  => void;
  }
}


 const useEditorSectionStore= create<editorSectionStoreType>((set) => ({
  height : 1000,
  actions : { 
    setHeight: (newState:number)  => {  set(() => ({ height : newState }));}
  },

}));


export const useHeightState= () =>  useEditorSectionStore  ((state) => state.height)



// 🎉  모든 action을 위한 하나의 selector
export const  useEditorSectionActions = () =>  useEditorSectionStore((state) => state.actions)