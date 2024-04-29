import { create } from "zustand";





interface Code {
  language: string;
  urls: File[];
}


interface  roomDataType {
  personnelCount: number;
  roomName: string;
  template: number;
  pdfUrls :File[];
  codeUrls: Code;
}

interface createRoomStoreType {
  roomData: roomDataType,
  actions : {
    increasePersonnal: () => void;
    decreasePersonnal: () => void;
    setCreateRoomName: (newName: string) => void;
    setBlankTemplate: (template: number) => void;
    setCodeLanguage: (newLanguage: string) => void;
    addPdfFiles: (newFiles: File) => void;
    removePdfFile: (fileToRemove:File) => void;
    addCodeFiles: (newFiles: File) => void;
    removeCodeFile: (fileToRemove: File) => void;
    resetCodeFile:()=>void;
  }
}


 const useCreateRoomStore = create<createRoomStoreType >((set) => ({
  roomData: {
    personnelCount:1, 
    roomName:"",
    template: 1,
    pdfUrls : [],
    codeUrls: {
      language : "py",
      urls : [],
    }
  },

  actions : { 
    increasePersonnal: () => {
      set((prev) => ({  roomData :{...prev.roomData , personnelCount : prev.roomData.personnelCount+1}} ));
    },
    decreasePersonnal: () => {
      set((prev) => ({  roomData :{...prev.roomData , personnelCount : prev.roomData.personnelCount-1}} ));
    },

    setCreateRoomName: (newName: string) => {
      set((prev) => ({ roomData: { ...prev.roomData, roomName: newName } }));
    },
    
    setBlankTemplate: (template: number) => {
      set((prev) => ({ roomData: { ...prev.roomData, template :template} }));
    },
    setCodeLanguage: (newLanguage: string) => {
      set((state) => ({
        roomData: { ...state.roomData, codeUrls: { ...state.roomData.codeUrls, language :newLanguage } },
      }));
    },

    addPdfFiles: (newFiles:File) => {
      set((state) => ({
        roomData: {
          ...state.roomData,
          pdfUrls: [... state.roomData.pdfUrls, newFiles] 
          },
        }
      ));
    },

    removePdfFile: (fileToRemove:File) => {
      set((state) => ({
        roomData: {
          ...state.roomData,
          pdfUrls: state.roomData.pdfUrls?.filter(file => file !== fileToRemove) 
        },
      }));
    },

    addCodeFiles: (newFiles: File) => {
      set((state) => ({
        roomData: {
          ...state.roomData,
          codeUrls: {
            ...state.roomData.codeUrls,
            urls: [... state.roomData.codeUrls.urls, newFiles] 
          },
        },
      }));
    },

    removeCodeFile: (fileToRemove:File) => {
      set((state) => ({
        roomData: {
          ...state.roomData,
          codeUrls: {
            ...state.roomData.codeUrls,
            urls: state.roomData.codeUrls.urls?.filter(file => file !== fileToRemove) 
          },
        },
      }));
    },

    resetCodeFile : () =>{
      set((state) => ({
        roomData: {
          ...state.roomData,
          codeUrls: {
            ...state.roomData.codeUrls,
            urls: [] 
          },
        },
      }));
    }
    
  },
}));


export const useCreateRoomDataState= () => useCreateRoomStore ((state) => state.roomData)


// 🎉  모든 action을 위한 하나의 selector
export const  useCreateRoomDataActions = () => useCreateRoomStore ((state) => state.actions)