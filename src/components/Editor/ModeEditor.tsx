import { useCodeFileListState, useModeState, useTemplateState } from "@/store/editorRoomInfoStore";
import React, { ReactNode } from "react";
import CodeEditor from "./Code/CodeEditor";
import CodeFileItem from "./Code/CodeFileItem";
import template1 from "@/assets/images/template/template1.png";
import template2 from "@/assets/images/template/template2.png";
import template3 from "@/assets/images/template/template3.png";
import template4 from "@/assets/images/template/template4.png";
import template5 from "@/assets/images/template/template5.png";
import template6 from "@/assets/images/template/template6.png";

const ModeEditor = () => {
  const templateCount = useTemplateState();
  const mode = useModeState();
  const codeFileList = useCodeFileListState();
  const templates = [template1, template2, template3, template4, template5, template6]; // 예시 이미지 경로 배열

  return (
    <div className="mode-editor-container">
      {mode === "blank" ? (
        <div className="blank-container">
          <img src={templates[templateCount - 1]} alt="빈화면" />
        </div>
      ) : mode === "code" ? (
        <div>
          {codeFileList.map((i) => (
            <CodeFileItem key={i} fileName={i} />
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
