
import { create } from "zustand";
import { CompileLanguage } from "@/types";

interface compileStoreType {
  // language:CompileLanguage,
  code:string,
  // version : string,
  input : null | string,

  actions : {
    // setLanguage:(newState:CompileLanguage)  => void;
    setCode:(newState:string)  => void;
    setInput: (newState:string) => void;
    // setVersion:(newState:string)=>void;

  }
}


 const useCompileStore = create<compileStoreType>((set) => ({
  // language: "python3",
  code:"",
  // version :"latest",
  input: null,

  actions : { 
    // setLanguage: (newState) => {
    //   set(() => ({ language : newState }));
    // },
    setCode: (newState) => {
      set(() => ({  code : newState }));
    },
   
    setInput: (newState) => {
      set(() => ({ input: newState })); // erase 상태 토글
    },
    // setVersion :  (newState) => {
    //   set(() => ({ version: newState }));
    // }, 
  },

}));





// export const useLanguageState= () =>useCompileStore  ((state) => state.language)
// export const useVersionState= () => useCompileStore  ((state) => state.version)
export const useInputState= () => useCompileStore ((state) => state.input)
export const useCodeState= () =>  useCompileStore  ((state) => state.code)
// 🎉  모든 action을 위한 하나의 selector
export const useCompileActions= () => useCompileStore ((state) => state.actions) 