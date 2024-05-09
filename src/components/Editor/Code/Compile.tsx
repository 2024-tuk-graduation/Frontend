import React, { useState } from "react";
import axios from "axios";
import { DefaultMenubar } from "..";
import { useLanguageState } from "@/store/editorRoomInfoStore";
import { useCodeState } from "@/store/compile";

const Compile: React.FC = () => {
  const [compileResult, setCompileResult] = useState(""); // 컴파일 결과를 저장할 상태

  const language = useLanguageState();
  const code = useCodeState();
  const serverURL = `${import.meta.env.VITE_APP_API_URL}/codes`;

  const compileLanguage: { [key: string]: string } = {
    python: "python3",
    javascript: "nodejs",
    c: "c",
  };

  const handleCompile = async () => {
    // 서버에 요청할 컴파일 데이터
    const CompileData = {
      language: compileLanguage[language],
      version: "latest",
      code: code,
      input: null,
    };

    console.log(CompileData, "들어갈 데이터");
    try {
      const response = await axios.post(serverURL, CompileData);
      console.log("컴파일 성공", response.data);
      setCompileResult(response.data.data.output);
    } catch (error) {
      console.error("컴파일 실패", error);
    }
  };

  return (
    <div>
      {" "}
      <DefaultMenubar title="컴파일" />
      <div>
        {/* <p>현재 언어 : {selectedLanguage}</p> */}
        <pre className="compile-result">{compileResult}</pre>
        <button className="compile-button" onClick={handleCompile}>
          RUN CODE
        </button>
      </div>
    </div>
  );
};

export default Compile;
