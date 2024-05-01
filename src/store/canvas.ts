import { PenType } from "@/types";
import { create } from "zustand";


interface canvasStoreType {
  lineWidth : number;
  strokeStyle : string;
  eraser : boolean;
  penType :  PenType;

  actions : {
    setLineWidth:(newState:number)  => void;
    setStrokeStyle:(newState:string)  => void;
    setEraser: (newState:boolean) => void;
    setPenType:(newState:PenType)=>void

  }
}


 const useCanvasStore = create<canvasStoreType>((set) => ({
  lineWidth : 10, 
  strokeStyle : "#000",
  eraser : false,
  penType : "pen",

  actions : { 
     setLineWidth: (newState) => {
      set(() => ({ lineWidth : newState }));
    },
    setStrokeStyle: (newState) => {
      set(() => ({  strokeStyle : newState }));
    },
   
    setEraser: (newState) => {
      set(() => ({ eraser: newState })); // erase 상태 토글
    },
    setPenType :  (newState) => {
      set(() => ({  penType : newState }));
    },
  
  },

}));

export const useLineWidthState= () =>  useCanvasStore ((state) => state.lineWidth)
export const useStrokeStyleState= () =>  useCanvasStore ((state) => state.strokeStyle)
export const useEraseState= () =>  useCanvasStore ((state) => state.eraser)
export const usePenTypeState= () =>  useCanvasStore ((state) => state.penType)

// 🎉  모든 action을 위한 하나의 selector
export const  useCanvasActions = () =>  useCanvasStore ((state) => state.actions) 