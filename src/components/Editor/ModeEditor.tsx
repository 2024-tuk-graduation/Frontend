import { useCodeFileListState, useModeState } from "@/store/editorRoomInfoStore";
import React, { ReactNode } from "react";
import CodeEditor from "./Code/CodeEditor";
import CodeFileItem from "./Code/CodeFileItem";
import template5 from "@/assets/images/template/template5.png";

const ModeEditor = () => {
  const mode = useModeState();
  const codeFileList = useCodeFileListState();
  return (
    <div className="mode-editor-container">
      {mode === "blank" ? (
        <div className="blank-container">
          <img src={template5} alt="빈화면" />
        </div>
      ) : mode === "code" ? (
        <div>
          {codeFileList.map((i) => (
            <CodeFileItem key={i.fileName} fileName={i.fileName} />
          ))}
          <CodeEditor />{" "}
        </div>
      ) : (
        <div className="pdf-container">
          <p>아직 업로드된 pdf가 없습니다. </p>

          <p>pdf를 업로드 해주세요 </p>
        </div>
      )}
    </div>
  );
};

export default ModeEditor;
