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
      {mode === "blank" ? (
        <div className="blank-container">
          <BlankCanvas />
        </div>
      ) : mode === "code" ? (
        <div>
          {/* {codeFileList.map((i) => (
            <CodeFileItem key={i} fileName={i} />
          ))} */}
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
