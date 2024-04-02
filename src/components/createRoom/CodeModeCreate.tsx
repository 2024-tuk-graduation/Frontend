import React, { useState } from "react";
import CodeLanguage from "./CodeLanguage";

const CodeModeCreate = () => {
  const [selectedOption, setSelectedOption] = useState("empty");
  const language = ["python", "javascript", "cplusplus"];
  return (
    <div className="pdf-mode-create-container">
      {" "}
      <label htmlFor="empty">
        <input
          type="radio"
          name="code"
          value="empty"
          id="empty"
          checked={selectedOption === "empty"}
          onChange={() => setSelectedOption("empty")}
        />
        code 파일 생략
      </label>
      <label htmlFor="upload">
        <input
          type="radio"
          name="code"
          value="upload"
          id="upload"
          checked={selectedOption === "upload"}
          onChange={() => setSelectedOption("upload")}
        />
        code 파일 업로드
      </label>
      {selectedOption !== "upload" ? (
        <div className="code-mode-language-area">
          <p>언어를 선택해주세요</p>
          <div className="code-mode-language-choose">
            {language.map((i) => (
              <CodeLanguage key={i} language={i} />
            ))}
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default CodeModeCreate;
