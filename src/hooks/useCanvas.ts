import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useEraseState, useLineWidthState, useStrokeStyleState } from "@/store/canvas";
import { WebSocketContext } from "@/context/WebSocketConnect";
import { useCookies } from "react-cookie";
import { useHostState } from "@/store/editorRoomInfoStore";
import { Mode } from "@/types";

interface Coordinate {
  x: number;
  y: number;
}

interface DrawData {
  lastX: number;
  lastY: number;
  offsetX: number;
  offsetY: number;
  isDrawing: boolean;
  mode: Mode; 
}

const useCanvas = (isDrawingMode: boolean, mode: Mode) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cookies] = useCookies(["rememberId"]);
  const host = useHostState();
  const isHost: boolean = host === String(cookies.rememberId);

  const lineWidth = useLineWidthState();
  const strokeStyle = useStrokeStyleState();
  const eraser = useEraseState();


  const lineWidthRef = useRef(lineWidth); 
  const strokeStyleRef = useRef(strokeStyle); 
  const eraseRef = useRef(eraser); 
  

  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
  const [isPainting, setIsPainting] = useState(false);

  
  useEffect(() => {
  lineWidthRef.current = lineWidth;
  }, [lineWidth]);
  
  useEffect(() => {
    strokeStyleRef.current = strokeStyle;
  }, [strokeStyle]);
  useEffect(() => {
  eraseRef.current = eraser;
  }, [eraser]);


  const getCoordinates = (event: MouseEvent): Coordinate | undefined => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate, sendToServer: boolean) => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    if (!context) return;

    context.strokeStyle = eraseRef.current ? "rgba(0,0,0,1)" : strokeStyleRef.current; 
    context.lineJoin = "round";
    context.lineWidth = lineWidthRef.current;
    context.globalCompositeOperation = eraseRef.current ? "destination-out" : "source-over";

    context.beginPath();
    context.moveTo(originalMousePosition.x, originalMousePosition.y);
    context.lineTo(newMousePosition.x, newMousePosition.y);
    context.closePath();
    context.stroke();

    if (sendToServer && isHost) {
      const drawData: DrawData = {
        lastX: originalMousePosition.x,
        lastY: originalMousePosition.y,
        offsetX: newMousePosition.x,
        offsetY: newMousePosition.y,
        isDrawing: true,
        mode: mode
      };
      stompClient.send(`/pub/canvasdraw`, JSON.stringify(drawData));
    }
  };

  const handleDrawData = (data: DrawData) => {
    const { lastX, lastY, offsetX, offsetY } = data;
    const originalMousePosition: Coordinate = { x: lastX, y: lastY };
    const newMousePosition: Coordinate = { x: offsetX, y: offsetY };
    drawLine(originalMousePosition, newMousePosition, false);
  };

  const startPaint = useCallback(
    (event: MouseEvent) => {
      if (!isDrawingMode || !isHost) return;
      const coordinates = getCoordinates(event);
      if (coordinates) {
        setIsPainting(true);
        setMousePosition(coordinates);
      }
    },
    [isDrawingMode, isHost]
  );

  const paint = useCallback(
    (event: MouseEvent) => {
      if (!isDrawingMode || !isHost) return;
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition, true);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, eraser, isDrawingMode, isHost]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    const overlayCanvas = canvasRef.current;
    if (overlayCanvas) {
      overlayCanvas.addEventListener("mousedown", startPaint);
      overlayCanvas.addEventListener("mousemove", paint);
      overlayCanvas.addEventListener("mouseup", exitPaint);
      overlayCanvas.addEventListener("mouseleave", exitPaint);

      return () => {
        overlayCanvas.removeEventListener("mousedown", startPaint);
        overlayCanvas.removeEventListener("mousemove", paint);
        overlayCanvas.removeEventListener("mouseup", exitPaint);
        overlayCanvas.removeEventListener("mouseleave", exitPaint);
      };
    }
  }, [startPaint, paint, exitPaint]);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  }, []);

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  const clearCanvas = (clearMode? : Mode) => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
    if(host){
      stompClient.send(`/pub/canvasdraw/clearall`, JSON.stringify({clearAll :  clearMode}));
    }
  };

  useEffect(() => {
    if (!isHost) {
      const subscriptions = [
        stompClient.subscribe("/sub/canvasdraw", (message: any) => {
          const drawData: DrawData = JSON.parse(message.body);
          if (drawData.mode === mode) {
            handleDrawData(drawData);
          }

        }),
        stompClient.subscribe("/sub/canvasdraw/clearall", (message: any) => {
          const clearData = JSON.parse(message.body);
          if(clearData.clearAll ===mode){ clearCanvas();}
        }),
      ];

      return () => {
        subscriptions.forEach((subscription) => subscription.unsubscribe());
      };
    }
  }, [isHost, stompClient]);

  return { canvasRef, containerRef, resizeCanvas, clearCanvas };
};

export default useCanvas;
