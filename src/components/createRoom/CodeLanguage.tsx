import React from "react";
import python from "@/assets/images/python.svg";
import javascript from "@/assets/images/javascript.svg";
import cplusplus from "@/assets/images/cplusepluse.svg";

const CodeLanguage = ({ language }: { language: string }) => {
  const languageImg = (language: string) => {
    switch (language) {
      case "cplusplus":
        return cplusplus;
      case "python":
        return python;
      case "javascript":
        return javascript;
      default:
        return undefined; // 기본 이미지 또는 언어에 해당하는 이미지가 없을 경우
    }
  };
  return (
    <div className="code-language-item-container">
      <img src={languageImg(language)} alt={language} />
      <p>{language}</p>
    </div>
  );
};

export default CodeLanguage;
