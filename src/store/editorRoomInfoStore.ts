import { create } from "zustand";
interface personType {
  name: string;
  img: string;
}

interface useEditorRoomInfoStoreType {
  entranceCode:string,
  host:string,
  language:string,
  roomName:string,
  maxPersonnel:number,
  currentPersonnel:number,
  personnelInfo: personType [],




  actions : {
    setEntranceCode: (newState : string) => void;
    setHost: (newState : string) => void;
    setLanguage:(newState : string) => void;
    setRoomName:(newState : string) => void;
    setCurrentPersonnel:(newState : number) => void;
    setPersonnelInfo: (name : string ,img : string) => void;
    resetPersonnelInfo:() =>void;

  
  }
}


 const useEditorRoomInfoStore = create< useEditorRoomInfoStoreType>((set) => ({
  entranceCode:"1a2s3d",
  host:"",
  language:"",
  roomName:"티노조아방",
  maxPersonnel:6,
  currentPersonnel:0,
  personnelInfo:[],


  actions : { 
    setEntranceCode: (newState) => {
      set(() => ({ entranceCode : newState }));
    },
    setHost: (newState) => {
      set(() => ({  host : newState }));
    },
    setLanguage: (newState) => {
      set(() => ({  language : newState }));
    },
    setRoomName: (newState) => {
      set(() => ({  roomName : newState }));
    },
    setCurrentPersonnel : (newState) => {
      set(() => ({  currentPersonnel : newState }));
    },
    setPersonnelInfo : (name, img) =>{
      set((prevState) => ({ personnelInfo : [
        ...prevState.personnelInfo,
        {name: name , img:img}
      ]
     }));
    },

    resetPersonnelInfo : () =>{
      set((prevState) => ({
        ...prevState,
        personnelInfo: [] // personnelInfo를 빈 배열로 초기화
      }));
    },
 
  },
}));



export const useEntranceCodeState= () =>useEditorRoomInfoStore ((state) => state.entranceCode)
export const useHostState= () =>useEditorRoomInfoStore ((state) => state.host)
export const useLanguageState= () =>useEditorRoomInfoStore ((state) => state.language)
export const useRoomNameState= () =>useEditorRoomInfoStore ((state) => state.roomName)
export const useCurrentPersonnelState= () =>useEditorRoomInfoStore ((state) => state.currentPersonnel)
export const useMaxPersonnelState= () =>useEditorRoomInfoStore ((state) => state.maxPersonnel)
export const usePersonnelInfoState= () =>useEditorRoomInfoStore ((state) => state.personnelInfo)





export const  useEditorRoomInfoActions = () => useEditorRoomInfoStore ((state) => state.actions)