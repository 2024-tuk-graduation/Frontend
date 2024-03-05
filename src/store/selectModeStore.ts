import { create } from "zustand";

export type Mode =  "code" | "pdf" | "blank";

interface selectModeStoreType {
  mode :  Mode 
  roomName : string
  personnel : number
  actions : {
    setMode: (newState : Mode) => void;
    increasePersonnal: () => void;
    decreasePersonnal: () => void;
    setName: (newState:string)  => void;
  }
}


 const useSelectModeStore = create<selectModeStoreType>((set) => ({
  mode :  "blank",
  roomName : "",
  personnel : 1,
  actions : { 
     setMode: (newState) => {
      set((prev) => ({ ...prev, mode : newState }));
    },
    increasePersonnal: () => {
      set((prev) => ({ ...prev,  personnel : prev.personnel+1 }));
    },
    decreasePersonnal: () => {
      set((prev) => ({ ...prev,   personnel : prev.personnel-1 }));
    },
    setName: (newState:string) => {
      set((prev) => ({ ...prev,   roomName  : newState }));
    },
  },

}));

export const useSelectModeState= () => useSelectModeStore((state) => state.mode)
export const useSelectRoomNameState= () => useSelectModeStore((state) => state.roomName)
export const useSelectPersonnelState= () => useSelectModeStore((state) => state.personnel)



// 🎉  모든 action을 위한 하나의 selector
export const  useSelectModeActions = () => useSelectModeStore((state) => state.actions)