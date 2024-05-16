import React, { useState } from "react";
import axios from "axios";
import { DefaultMenubar } from "..";
import { useLanguageState } from "@/store/editorRoomInfoStore";
import { useCodeState, useCompileActions, useInputState } from "@/store/compile";

const Compile: React.FC = () => {
  const [compileResult, setCompileResult] = useState(""); // 컴파일 결과를 저장할 상태
  const input = useInputState();
  const language = useLanguageState();
  const code = useCodeState();
  const { setInput } = useCompileActions();
  const serverURL = `${import.meta.env.VITE_APP_API_URL}/codes`;

  const compileLanguage: { [key: string]: string } = {
    py: "python3",
    js: "nodejs",
    c: "c",
  };

  const handleCompile = async () => {
    // 서버에 요청할 컴파일 데이터
    const CompileData = {
      language: compileLanguage[language],
      version: "latest",
      code: code,
      input: input === "" ? null : input,
    };

    try {
      const response = await axios.post(serverURL, CompileData);
      setCompileResult(response.data.data.output);
    } catch (error) {
      console.error("컴파일 실패", error);
    }
  };

  return (
    <div>
      {" "}
      <DefaultMenubar title="컴파일" />
      <div className="compile-container">
        <div className="input-container">
          <div className="input-hint">&gt;&gt;&gt;</div>
          <textarea className="input-area" onChange={(e) => setInput(e.target.value)} value={input} />
        </div>

        <pre className="compile-result">{compileResult}</pre>

        <button className="compile-button" onClick={handleCompile}>
          RUN CODE
        </button>
      </div>
    </div>
  );
};

export default Compile;
