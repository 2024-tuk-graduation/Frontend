import { useModeState } from "@/store/editorRoomInfoStore";
import React from "react";
import { CodeEditor } from "@/components/Editor";
import { BlankCanvas } from "@/components/Editor";
import { PdfView } from "@/components/Editor";
import { FileItemTitle } from "@/components/Editor";

const ModeEditor = () => {
  const mode = useModeState();

  return (
    <div className="mode-editor-container">
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
  );
};

export default ModeEditor;
