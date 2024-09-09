import React, { useState } from "react";
import CodeLanguage from "./CodeLanguage";
import SelectUpload from "./SelectUpload";
import { useCreateRoomDataState } from "@/store/createRoomStore";
import FileUpload from "./FileUpload";
import useCreateFileUpload from "@/hooks/useCreateFileUpload";

const CodeModeCreate = () => {
  const [selectedCodeOption, setSelectedCodeOption] = useState("empty");
  const language = ["py", "js", "c"];
  const roomData = useCreateRoomDataState();
  const { onCodeFileUpload, onCodeFileDelete } = useCreateFileUpload();

  return (
    <div>
      <SelectUpload mode={"code"} select={selectedCodeOption} setSelect={setSelectedCodeOption} />
      <div className="code-mode-language-area">
        <p className="code-mode-language">언어를 선택해주세요</p>
        <div className="code-mode-language-choose">
          {language.map((i) => (
            <CodeLanguage key={i} language={i} />
          ))}
        </div>
      </div>
      {selectedCodeOption === "upload" && (
        <FileUpload
          name="code"
          id="uploadCodeFile"
          accept={`.${roomData.codeUrls.language}`}
          files={roomData.codeUrls.urls}
          fileUpload={onCodeFileUpload}
          fileDelete={onCodeFileDelete}
        />
      )}
    </div>
  );
};
export default CodeModeCreate;
