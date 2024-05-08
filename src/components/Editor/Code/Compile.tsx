import React, { useState } from "react";
import axios from "axios";
import { DefaultMenubar } from "..";
// import { useLanguageState } from "@/store/editorRoomInfoStore";
// import { useCreateRoomDataState } from "@/store/createRoomStore";

const Compile: React.FC = () => {
  // const SelectedLanguage = setCodeLanguage();
  // const selectedLanguage = useLanguageState();
  const [compileResult, setCompileResult] = useState(""); // 컴파일 결과를 저장할 상태

  const serverURL = `${import.meta.env.VITE_APP_API_URL}/codes`;

  const handleCompile = async () => {
    // 서버에 요청할 컴파일 데이터
    const CompileData = {
      // language: selectedLanguage,
      language: "python3",
      version: "latest",
      // code: codeData,
      code: "print('Hello')",
      input: null,
    };

    try {
      const response = await axios.post(serverURL, CompileData);
      console.log("요청 데이터", CompileData);
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
