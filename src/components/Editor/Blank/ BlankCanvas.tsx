import { useTemplateState } from "@/store/editorRoomInfoStore";
import React, { useEffect } from "react";
import { templates } from "@/data";
import useCanvas from "@/hooks/useCanvas";

const BlankCanvas = () => {
  const templateCount = useTemplateState();
  const { canvasRef, containerRef, resizeCanvas } = useCanvas(true);

  useEffect(() => {
    resizeCanvas();
  }, [resizeCanvas]);

  return (
    <div ref={containerRef} style={{ width: "100%", height: "100%" }}>
      <img
        src={templates[templateCount - 1]}
        style={{ position: "relative", top: 0, left: 0, width: "100%", height: "100%", overflow: "hidden" }}
        alt="빈화면"
      />
      <canvas ref={canvasRef} style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }} />
    </div>
  );
};

export default BlankCanvas;
