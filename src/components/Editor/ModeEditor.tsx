import { useCodeFileListState, useModeState } from "@/store/editorRoomInfoStore";
import React, { ReactNode } from "react";
import CodeEditor from "./Code/CodeEditor";
import CodeFileItem from "./Code/CodeFileItem";

const ModeEditor = () => {
  const mode = useModeState();
  const codeFileList = useCodeFileListState();
  return (
    <div>
      {mode === "blank" ? (
        <div>빈페이지</div>
      ) : mode === "code" ? (
        <div className="code-mode-editor-container">
          {codeFileList.map((i) => (
            <CodeFileItem key={i.fileName} fileName={i.fileName} />
          ))}
          <CodeEditor />{" "}
        </div>
      ) : (
        <div>pdf</div>
      )}
    </div>
  );
};

export default ModeEditor;
