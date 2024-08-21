import { useTemplateState } from "@/store/editorRoomInfoStore";
import React, { useEffect } from "react";
import { templates } from "@/data";
import useCanvas from "@/hooks/useCanvas";
import FileItemTitle from "@/components/Editor";
import { Clear } from "@/components/Editor";

const BlankCanvas = () => {
  const templateCount = useTemplateState();
  const { clearCanvas, canvasRef, containerRef, resizeCanvas } = useCanvas(true, "blank");

  useEffect(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  return (
    <div className="blank-img-container" ref={containerRef}>
      <Clear handleClear={clearCanvas} mode="blank" />
      <img
        className="blank-img"
        src={templates[templateCount - 1]}
        style={{ position: "relative", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}
        alt="빈화면"
      />
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
    </div>
  );
};

export default BlankCanvas;
