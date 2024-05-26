import React from "react";
import PythonLogo from "@/assets/images/python.svg";
import { useSelectFileActions } from "@/store/selectFile";
import { Mode } from "@/types";

interface FileItemTitlePropsType {
  fileName: string;
  fileType: Mode;
}
const FileItemTitle = ({ fileName, fileType }: FileItemTitlePropsType) => {
  const { setEditCodeFile } = useSelectFileActions();
  return (
    <div
      onClick={() => {
        fileType === "code" ? setEditCodeFile(fileName) : "";
      }}
      className="code-file-item-container"
    >
      <div>
        {" "}
        <img src={PythonLogo} />{" "}
      </div>
      <p>{fileName}</p>
    </div>
  );
};

export default FileItemTitle;
