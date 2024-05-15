import { Mode } from "@/store/selectModeStore";
import React from "react";
import { BlankScreenModeCreate, CodeModeCreate, PdfModeCreate } from "..";

interface EditorModeButtonPropsType {
  img: string;
  title: string;
  mode: Mode;
}
const EditorMode = ({ img, title, mode }: EditorModeButtonPropsType) => {
  return (
    <div className="editor-mode-container">
      <div className="editor-mode-navbar">
        <h1>{mode}</h1>
        <div>
          <div className="editor-mode-img-container">
            <img src={img} alt={title}></img>
          </div>
        </div>
      </div>

      <div className="editor-mode-content">
        {mode === "blank" ? (
          <BlankScreenModeCreate />
        ) : mode === "code" ? (
          <CodeModeCreate />
        ) : mode === "pdf" ? (
          <PdfModeCreate />
        ) : null}
      </div>
    </div>
  );
};

export default EditorMode;
