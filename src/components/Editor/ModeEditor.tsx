import { useModeState } from "@/store/editorRoomInfoStore";
import React from "react";
import CodeEditor from "./Code/CodeEditor";
import BlankCanvas from "./Blank/ BlankCanvas";
import { PdfView } from ".";
import FileItemTitle from "./FileItemTitle";

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
