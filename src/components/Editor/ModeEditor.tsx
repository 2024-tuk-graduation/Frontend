import { useModeState } from "@/store/editorRoomInfoStore";
import React, { useRef } from "react";
import CodeEditor from "./Code/CodeEditor";
import BlankCanvas from "./Blank/ BlankCanvas";
import { PdfView } from ".";
import FileItemTitle from "./FileItemTitle";
import saveAs from "file-saver";
import html2canvas from "html2canvas";

const ModeEditor = () => {
  const mode = useModeState();
  const captureRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!captureRef.current) return;

    try {
      const div = captureRef.current;
      const canvas = await html2canvas(div, { scale: 2 });
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, "result.png");
        }
      });
    } catch (error) {
      console.error("Error converting div to image:", error);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>캡쳐하기</button>
      <div className="mode-editor-container" ref={captureRef}>
        <div className={`blank-container ${mode === "blank" ? "select" : ""}`}>
          <FileItemTitle fileName="1" fileType="pdf" />
          <BlankCanvas />
        </div>

        <div style={mode === "code" ? {} : { display: "none" }}>
          <CodeEditor />
        </div>

        <div className={`pdf-container ${mode === "pdf" ? "select" : ""}`}>
          <PdfView />
        </div>
      </div>
    </div>
  );
};

export default ModeEditor;
