import React from "react";

interface SelectUploadProps {
  mode: "pdf" | "code";
  select: string;
  setSelect: React.Dispatch<React.SetStateAction<string>>;
}
const SelectUpload = ({ mode, select, setSelect }: SelectUploadProps) => {
  return (
    <div className="pdf-mode-create-container">
      <label>
        <input
          type="radio"
          name={mode}
          value="empty"
          id="empty"
          checked={select === "empty"}
          onChange={() => setSelect("empty")}
        />
        {mode + "파일 생략"}
      </label>
      <label>
        <input
          type="radio"
          name={mode}
          value="upload"
          id="upload"
          checked={select === "upload"}
          onChange={() => setSelect("upload")}
        />
        {mode + "파일 업로드"}
      </label>
    </div>
  );
};

export default SelectUpload;
