import { Mode, useSelectModeActions, useSelectModeState } from "@/store/selectModeStore";
import React from "react";

interface EditorModeButtonPropsType {
  img: string;
  title: string;
  mode: Mode;
}
const EditorModeButton = ({ img, title, mode }: EditorModeButtonPropsType) => {
  const { setMode } = useSelectModeActions();
  const currentMode = useSelectModeState();
  const isActive = currentMode === mode;

  console.log("dfd");
  return (
    <div
      className={`editor-mode-button-container ${isActive ? "active" : ""}`}
      onClick={() => {
        setMode(mode);
      }}
    >
      <img className="editor-mode-button-img" src={img} alt={title} />
      <p className="editor-mode-button-text">{title}</p>
    </div>
  );
};

export default EditorModeButton;
