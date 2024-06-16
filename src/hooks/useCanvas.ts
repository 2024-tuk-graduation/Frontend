import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { useEraseState, useLineWidthState, useStrokeStyleState } from "@/store/canvas";
import { WebSocketContext } from "@/context/WebSocketConnect";
import { useCookies } from "react-cookie";
import { useHostState } from "@/store/editorRoomInfoStore";

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
}

const useCanvas = (isDrawingMode: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [cookies] = useCookies(["rememberId"]);
  const host = useHostState();
  const isHost: boolean = host === String(cookies.rememberId);

  const lineWidth = useLineWidthState();
  const strokeStyle = useStrokeStyleState();
  const eraser = useEraseState();

  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

  const [mousePosition, setMousePosition] = useState<Coordinate | undefined>(undefined);
  const [isPainting, setIsPainting] = useState(false);

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

    context.strokeStyle = eraser ? "rgba(0,0,0,1)" : strokeStyle;
    context.lineJoin = "round";
    context.lineWidth = lineWidth;
    context.globalCompositeOperation = eraser ? "destination-out" : "source-over";

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
      };
      stompClient.send(`/pub/canvasdraw`, JSON.stringify(drawData));
      console.log( drawData)
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

  useEffect(() => {
    if (!isHost) {
      const subscription = stompClient.subscribe("/sub/canvasdraw", (message: any) => {
        const drawData: DrawData = JSON.parse(message.body);
      console.log(drawData);
        handleDrawData(drawData);
      });

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [isHost, stompClient]);

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

  const clearCanvas = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  return { canvasRef, containerRef, resizeCanvas, clearCanvas };
};

export default useCanvas;
