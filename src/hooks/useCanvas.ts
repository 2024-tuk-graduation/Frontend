import { useCallback, useEffect, useRef, useState } from "react";
import { useEraseState, useLineWidthState, useStrokeStyleState } from "@/store/canvas";

interface Coordinate {
  x: number;
  y: number;
}

const useCanvas = (isDrawingMode: boolean) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const lineWidth = useLineWidthState();
  const strokeStyle = useStrokeStyleState();
  const eraser = useEraseState();

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

  const drawLine = (originalMousePosition: Coordinate, newMousePosition: Coordinate) => {
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
  };

  const startPaint = useCallback((event: MouseEvent) => {
    if (!isDrawingMode) return;
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, [isDrawingMode]);

  const paint = useCallback(
    (event: MouseEvent) => {
      if (!isDrawingMode) return;
      event.preventDefault();
      event.stopPropagation();

      if (isPainting) {
        const newMousePosition = getCoordinates(event);
        if (mousePosition && newMousePosition) {
          drawLine(mousePosition, newMousePosition);
          setMousePosition(newMousePosition);
        }
      }
    },
    [isPainting, mousePosition, eraser, isDrawingMode]
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

  return { canvasRef, containerRef, resizeCanvas };
};

export default useCanvas;
