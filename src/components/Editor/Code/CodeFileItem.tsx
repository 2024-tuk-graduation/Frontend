import React from "react";
import PythonLogo from "@/assets/images/python.svg";
import { useSelectFileActions } from "@/store/selectFile";
const CodeFileItem = ({ fileName }: { fileName: string }) => {
  const { setEditCodeFile } = useSelectFileActions();
  return (
    <div
      onClick={() => {
        setEditCodeFile(fileName), console.log(fileName);
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

export default CodeFileItem;
