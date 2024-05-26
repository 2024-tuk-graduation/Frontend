
import { create } from "zustand";
import { codeFileItem, pdfFileItem} from "./editorRoomInfoStore";


interface selectFileType {
  code:string,
  pdf : string,
  actions : {
    setEditCodeFile:(title :string) => void;
    getEditCodeFile:(title:string , list : codeFileItem[])  => string | undefined;
    setEditPdfFile:(title :string) => void;
    getEditPdfFile:(title:string , list : pdfFileItem[])  => string | undefined;
  }
}


 const useSelectFile = create<selectFileType>((set) => ({
  code: "",
  pdf: "",
  actions : { 
    getEditCodeFile: (title , list) => {
      return (list.find((file) => file.title === title))?.content
    },
    setEditCodeFile: (title) => {
      set(() => ({code: title}));
    },
    getEditPdfFile: (title , list) => {
      return (list.find((file) => file.fileName === title))?.fileUrl
    },
    setEditPdfFile: (title) => {
      set(() => ({pdf: title}));
    },
   
  },

}));




export const useCodeState= () => useSelectFile  ((state) => state.code)
export const usePdfState= () => useSelectFile   ((state) => state.pdf)
// 🎉  모든 action을 위한 하나의 selector
export const useSelectFileActions= () => useSelectFile   ((state) => state.actions) 