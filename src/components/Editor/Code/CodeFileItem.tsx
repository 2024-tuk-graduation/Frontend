import React from "react";
import PythonLogo from "@/assets/images/python.svg";
const CodeFileItem = ({ fileName }: { fileName: string }) => {
  return (
    <div className="code-file-item-container">
      <div>
        {" "}
        <img src={PythonLogo} />{" "}
      </div>
      <p>{fileName}</p>
    </div>
  );
};

export default CodeFileItem;
