import { create } from "zustand";

export type Mode =  "code" | "pdf" | "blank";

interface selectModeStoreType {

  roomName : string
  personnel : number
  actions : {
   
    increasePersonnal: () => void;
    decreasePersonnal: () => void;
    setName: (newState:string)  => void;
  }
}


 const useSelectModeStore = create<selectModeStoreType>((set) => ({

  roomName : "",
  personnel : 1,
  actions : { 
     
    increasePersonnal: () => {
      set((prev) => ({ personnel : prev.personnel+1 }));
    },
    decreasePersonnal: () => {
      set((prev) => ({   personnel : prev.personnel-1 }));
    },
    setName: (newState:string) => {
  
      set(() => ({ roomName  : newState }));
    },
  },

}));


export const useSelectRoomNameState= () => useSelectModeStore((state) => state.roomName)
export const useSelectPersonnelState= () => useSelectModeStore((state) => state.personnel)



// 🎉  모든 action을 위한 하나의 selector
export const  useSelectModeActions = () => useSelectModeStore((state) => state.actions)