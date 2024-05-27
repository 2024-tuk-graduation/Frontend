import { usePdfFileListState } from "@/store/editorRoomInfoStore";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import FileItemTitle from "../FileItemTitle";
import doubleArrow from "@/assets/images/doubleArrow.svg";
import { usePdfState, useSelectFileActions } from "@/store/selectFile";
import { useEraseState, useLineWidthState, useStrokeStyleState } from "@/store/canvas";

pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

const PdfView = () => {
  const pdfFileList = usePdfFileListState();
  const editPdfTitle = usePdfState();
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const overlayCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { getEditPdfFile } = useSelectFileActions();
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    resizeCanvas();
  };

  const onDocumentError = (error: Error) => {
    console.log("pdf viewer error", error);
  };

  const onDocumentLocked = () => {
    console.log("pdf locked");
  };

  const onhandlePdfPage = (direction: string) => {
    if (pageNumber > 1 && direction === "left") {
      setPageNumber(pageNumber - 1);
    } else if (pageNumber < numPages && direction === "right") {
      setPageNumber(pageNumber + 1);
    }
  };

  // Drawing related states and functions
  const lineWidth = useLineWidthState();
  const strokeStyle = useStrokeStyleState();
  const eraser = useEraseState();
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number } | undefined>(undefined);
  const [isPainting, setIsPainting] = useState(false);

  const getCoordinates = (event: MouseEvent) => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  };

  const drawLine = (originalMousePosition: { x: number; y: number }, newMousePosition: { x: number; y: number }) => {
    const canvas = overlayCanvasRef.current;
    if (!canvas) return;

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
    const coordinates = getCoordinates(event);
    if (coordinates) {
      setIsPainting(true);
      setMousePosition(coordinates);
    }
  }, []);

  const paint = useCallback(
    (event: MouseEvent) => {
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
    [isPainting, mousePosition, eraser]
  );

  const exitPaint = useCallback(() => {
    setIsPainting(false);
  }, []);

  useEffect(() => {
    const overlayCanvas = overlayCanvasRef.current;
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

  const resizeCanvas = () => {
    const canvas = overlayCanvasRef.current;
    const container = containerRef.current;

    if (canvas && container) {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    return () => window.removeEventListener("resize", resizeCanvas);
  }, []);

  useEffect(() => {
    resizeCanvas();
  }, [pageNumber]);

  return (
    <>
      {pdfFileList.length === 0 ? (
        <div className="no-pdf">
          <p>아직 업로드된 pdf가 없습니다.</p>
          <br />
          <p>pdf를 업로드 해주세요</p>
        </div>
      ) : (
        <div style={{ position: "relative", width: "100%", height: "100%" }}>
          <div className="yes-pdf">
            <div className="file-title-list-container">
              {pdfFileList.map((i, index) => (
                <FileItemTitle key={index} fileName={i.fileName} fileType="pdf" />
              ))}
            </div>

            <div className="pdf-content-container">
              <div ref={containerRef} style={{ width: "100%", height: 610, position: "relative" }}>
                <Document
                  file={
                    getEditPdfFile(editPdfTitle, pdfFileList) ? getEditPdfFile(editPdfTitle, pdfFileList) : undefined
                  }
                  onLoadError={onDocumentError}
                  onPassword={onDocumentLocked}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} height={610} />
                </Document>

                <canvas
                  ref={overlayCanvasRef}
                  style={{ position: "absolute", top: 0, left: 0, width: "100%", height: 610, zIndex: 9099 }}
                />
              </div>
              <div className="pdf-page-control-container">
                <div className="pdf-arrows-container">
                  <div className="pdf-arrow-button" onClick={() => onhandlePdfPage("left")}>
                    <img src={doubleArrow} alt="left" />
                  </div>
                  <div className="pdf-arrow-button right" onClick={() => onhandlePdfPage("right")}>
                    <img src={doubleArrow} alt="right" />
                  </div>
                </div>
                <div className="pdf-page-info-container">
                  <h3>page</h3>
                  <div className="pdf-page">
                    <p>
                      {pageNumber} / {numPages}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfView;
