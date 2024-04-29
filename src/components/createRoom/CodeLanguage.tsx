import React from "react";
import pythonImg from "@/assets/images/python.svg";
import javascriptImg from "@/assets/images/javascript.svg";
import cImg from "@/assets/images/c.svg";
import { useCreateRoomDataActions, useCreateRoomDataState } from "@/store/createRoomStore";

const CodeLanguage = ({ language }: { language: string }) => {
  const { setCodeLanguage, resetCodeFile } = useCreateRoomDataActions();
  const roomData = useCreateRoomDataState();

  interface languageInfoType {
    title: string;
    img: string;
  }

  interface languagesType {
    [key: string]: languageInfoType;
  }

  const languages: languagesType = {
    c: { title: "c", img: cImg },
    py: { title: "python", img: pythonImg },
    js: { title: "javascript", img: javascriptImg },
  };
  const isSelected = roomData.codeUrls.language === language;
  const { title, img } = languages[language] || { title: undefined, img: undefined };

  const onClickLanguage = () => {
    setCodeLanguage(language);
    resetCodeFile();
  };
  return (
    <div className={`code-language-item-container ${isSelected ? "template-selected" : ""}`} onClick={onClickLanguage}>
      <img src={img} alt={title} />
      <p>{title}</p>
    </div>
  );
};

export default CodeLanguage;
