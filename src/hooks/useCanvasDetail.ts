import { WebSocketContext } from '@/context/WebSocketConnect';
import { highlighterColorPlatte, penColorPlatte } from '@/data';
import { useCanvasActions } from '@/store/canvas';
import { useHostState } from '@/store/editorRoomInfoStore';
import { PenType } from '@/types';
import React, { useContext, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const useCanvasDetail = () => {
  const {  setStrokeStyle, setEraser, setPenType,setLineWidth } = useCanvasActions();
  const host = useHostState();
  const [cookies] = useCookies(["rememberId"]);
  const isHost: boolean = host === String(cookies.rememberId);
  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근


  const onHandlePenType = (toolName: PenType) => {
    setPenType(toolName);
    toolName === "eraser"
      ? (setEraser(true), setStrokeStyle("rgba(0,0,0,1)"))
      : (setEraser(false),
        toolName === "highlighter" ? setStrokeStyle(highlighterColorPlatte[0]) : setStrokeStyle(penColorPlatte[0]));
    if (isHost) {
      stompClient.send(`/pub/canvasdraw/type`, JSON.stringify({ drawType: toolName }));
    }
  }; 

  const onHandlePenLineWidth = (penWidth : number | string) =>{
    setLineWidth(Number(penWidth));
    if (isHost) {
      stompClient.send(`/pub/canvasdraw/thickness`, JSON.stringify({thickness: penWidth }));
    }
  }
  const onHandleStrokeStyle = (color : string) =>{
    setStrokeStyle(color);
    if (isHost) {
      stompClient.send(`/pub/canvasdraw/color`, JSON.stringify({ color: color }));
    }
    

  }



  useEffect(() => {
    if (!isHost) {
      const subscriptions = [
        stompClient.subscribe("/sub/canvasdraw/color", (message: any) => {
          const drawColor= JSON.parse(message.body);
          console.log(drawColor.color)
          onHandleStrokeStyle(drawColor.color)
        
        }),
        stompClient.subscribe("/sub/canvasdraw/thickness", (message: any) => {
          const drawThickness= JSON.parse(message.body);
          onHandlePenLineWidth(drawThickness.thickness)
        
        }),
        stompClient.subscribe("/sub/canvasdraw/type", (message: any) => {
          const penType= JSON.parse(message.body);
          onHandlePenType(penType.drawType)
        }),

      ];
      return () => {
        subscriptions.forEach((subscription) => subscription.unsubscribe());
      };
    }
  }, [isHost, stompClient]);
  


  return {onHandlePenType , onHandlePenLineWidth  , onHandleStrokeStyle}
};

export default useCanvasDetail;