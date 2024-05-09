
import { create } from "zustand";

interface compileStoreType {
  code:string,
  input :  string,
  actions : {
    setCode:(newState:string)  => void;
    setInput: (newState:string) => void;

  }
}


 const useCompileStore = create<compileStoreType>((set) => ({
  code:"",
  input: "",
  actions : { 

    setCode: (newState) => {
      set(() => ({  code : newState }));
    },
    setInput: (newState) => {
      set(() => ({ input: newState })); // erase 상태 토글
    },
  
  },

}));




export const useInputState= () => useCompileStore ((state) => state.input)
export const useCodeState= () =>  useCompileStore  ((state) => state.code)
// 🎉  모든 action을 위한 하나의 selector
export const useCompileActions= () => useCompileStore ((state) => state.actions) 