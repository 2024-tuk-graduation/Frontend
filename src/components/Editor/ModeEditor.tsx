import { useCodeFileListState, useModeState } from "@/store/editorRoomInfoStore";
import React from "react";
import CodeEditor from "./Code/CodeEditor";
import CodeFileItem from "./Code/CodeFileItem";

import BlankCanvas from "./Blank/ BlankCanvas";

const ModeEditor = () => {
  const mode = useModeState();
  const codeFileList = useCodeFileListState();

  return (
    <div className="mode-editor-container">
      <div className="blank-container" style={mode === "blank" ? {} : { display: "none" }}>
        <BlankCanvas />
      </div>

      <div style={mode === "code" ? {} : { display: "none" }}>
        <div className="codeFile-title-list-container">
          {codeFileList.map((i, index) => (
            <CodeFileItem key={index} fileName={i.title} />
          ))}
        </div>

        <CodeEditor />
      </div>

      <div className="pdf-container" style={mode === "pdf" ? {} : { display: "none" }}>
        <p>아직 업로드된 pdf가 없습니다. </p>
        <p>pdf를 업로드 해주세요 </p>
      </div>
    </div>
  );
};

export default ModeEditor;
