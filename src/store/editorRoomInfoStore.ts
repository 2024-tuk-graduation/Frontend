import { create } from "zustand";
import { Mode } from "@/types/Mode";
export interface pdfFileItem {
  fileUrl : string;
fileName:string;
}

export interface codeFileItem {
  title: string;
  content: string;
}
interface useEditorRoomInfoStoreType {
  entranceCode: string;
  host: string;
  language: string;
  roomName: string;
  template: number;
  mode: Mode;
  maxPersonnel: number;
  currentPersonnel: number;
  roomId: number;
  personnelInfo: string[];
  codeFileList: codeFileItem[];
  pdfFileList:  pdfFileItem [];
 

  actions: {
    setEntranceCode: (newState: string) => void;
    setHost: (newState: string) => void;
    setLanguage: (newState: string) => void;
    setRoomName: (newState: string) => void;
    setCurrentPersonnel: (newState: number) => void;
    setMaxPersonnel: (newState: number) => void;
    setPersonnelInfo: (newState: string[]) => void;
    addCodeFile: (title: string, content: string) => void;
    setPdfFileList: (newState: pdfFileItem []) => void;

    setMode: (newState: Mode) => void;
    setRoomId: (newState: number) => void;
    setTemplate: (newState: number) => void;
  };
}

const useEditorRoomInfoStore = create<useEditorRoomInfoStoreType>((set) => ({
  entranceCode: "",
  host: "",
  roomId: 0,
  language: "py",
  roomName: "RoomName",
  maxPersonnel: 6,
  currentPersonnel: 1,
  personnelInfo: [],
  pdfFileList: [],
  mode: "blank",
  template: 1,
  codeFileList: [],

  actions: {
    setTemplate: (newState) => {
      set(() => ({ template: newState }));
    },
    setEntranceCode: (newState) => {
      set(() => ({ entranceCode: newState }));
    },
    setHost: (newState) => {
      set(() => ({ host: newState }));
    },
    setLanguage: (newState) => {
      set(() => ({ language: newState }));
    },
    setRoomName: (newState) => {
      set(() => ({ roomName: newState }));
    },
    setCurrentPersonnel: (newState) => {
      set(() => ({ currentPersonnel: newState }));
    },

    setMaxPersonnel: (newState) => {
      set(() => ({ maxPersonnel: newState }));
    },
    setPersonnelInfo: (newState) => {
      set(() => ({ personnelInfo: newState }));
    },

    setMode: (newState) => {
      set(() => ({ mode: newState }));
    },
    
    addCodeFile: (title, content) =>
      set((state) => ({
        codeFileList: [...state.codeFileList, { title, content }],
      })),
    setRoomId: (newState) => {
      set(() => ({ roomId: newState }));
    },

    setPdfFileList: (newState :pdfFileItem [] ) => {
      set(() => ({ pdfFileList: newState }));
    },
  },
}));

export const useEntranceCodeState = () => useEditorRoomInfoStore((state) => state.entranceCode);
export const useHostState = () => useEditorRoomInfoStore((state) => state.host);
export const useLanguageState = () => useEditorRoomInfoStore((state) => state.language);
export const useRoomNameState = () => useEditorRoomInfoStore((state) => state.roomName);
export const useCurrentPersonnelState = () => useEditorRoomInfoStore((state) => state.currentPersonnel);
export const useMaxPersonnelState = () => useEditorRoomInfoStore((state) => state.maxPersonnel);
export const usePersonnelInfoState = () => useEditorRoomInfoStore((state) => state.personnelInfo);
export const useModeState = () => useEditorRoomInfoStore((state) => state.mode);
export const useCodeFileListState = () => useEditorRoomInfoStore((state) => state.codeFileList);
export const useTemplateState = () => useEditorRoomInfoStore((state) => state.template);
export const useRoomId = () => useEditorRoomInfoStore((state) => state.roomId);
export const usePdfFileListState = () => useEditorRoomInfoStore((state) => state.pdfFileList);
export const useEditorRoomInfoActions = () => useEditorRoomInfoStore((state) => state.actions);
