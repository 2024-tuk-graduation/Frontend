import React from "react";
import PythonLogo from "@/assets/images/python.svg";
import { useSelectFileActions } from "@/store/selectFile";
import { Mode } from "@/types";
import pdfLogo from "@/assets/images/pdf.svg";

interface FileItemTitlePropsType {
  fileName: string;
  fileType: Mode;
}
const FileItemTitle = ({ fileName, fileType }: FileItemTitlePropsType) => {
  const { setEditCodeFile, setEditPdfFile } = useSelectFileActions();
  return (
    <div
      onClick={() => {
        fileType === "code" ? setEditCodeFile(fileName) : setEditPdfFile(fileName);
      }}
      className="code-file-item-container"
    >
      <div>
        <img src={`${fileType === "pdf" ? pdfLogo : PythonLogo} `} />{" "}
      </div>
      <div>
        <p>{fileName}</p>
      </div>
    </div>
  );
};

export default FileItemTitle;
