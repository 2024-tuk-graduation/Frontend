import { useCodeFileListState, useModeState } from "@/store/editorRoomInfoStore";
import React from "react";
import CodeEditor from "./Code/CodeEditor";
import CodeFileItem from "./Code/CodeFileItem";

import BlankCanvas from "./Blank/ BlankCanvas";

const ModeEditor = ({ code }: { code: any }) => {
  const mode = useModeState();
  const codeFileList = useCodeFileListState();

  const codeFileTitleList = codeFileList.map((i) => i.split("_")[1]);
  console.log(codeFileTitleList);
  return (
    <div className="mode-editor-container">
      {mode === "blank" ? (
        <div className="blank-container">
          <BlankCanvas />
        </div>
      ) : mode === "code" ? (
        <div>
          <div className="codeFile-title-list-container">

            {codeFileList.map((i, index) => (
              <CodeFileItem key={index} fileName={i.title} />
            ))}
          </div>
          <CodeEditor />

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
