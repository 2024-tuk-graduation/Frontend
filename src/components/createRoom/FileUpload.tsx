import useCreateFileUpload from "@/hooks/useCreateFileUpload";
import React from "react";

import uploadIcon from "@/assets/images/upload.svg";
import pdfFile from "@/assets/images/pdfFile.svg";
import trash from "@/assets/images/trash.svg";
interface FileUploadType {
  name: string;
  id: string;
  accept: string;
  files: File[];
  fileUpload: any;
  fileDelete: any;
}
const FileUpload = ({ name, id, accept, files, fileUpload, fileDelete }: FileUploadType) => {
  const { fileInputRef, onClickFileInput } = useCreateFileUpload();
  return (
    <div className="pdf-mode-create-upload-container">
      <div className="pdf-mode-upload-area-container">
        {" "}
        <input type="file" name={name} id={id} onChange={fileUpload} accept={accept} ref={fileInputRef} />
        <img src={uploadIcon} alt="업로드"></img>
        <p>Drag and drop files here</p>
        <p>-OR-</p>
        <button id={id} onClick={onClickFileInput}>
          Browse Files
        </button>
      </div>
      <div className="create-list">
        <p>uploaded files</p>
        {files.length !== 0 &&
          files.map((i, index) => (
            <div className="create-list-item" key={index}>
              <img src={pdfFile} alt={`${name}파일`} />
              <p>{i.name}</p>
              <img src={trash} alt="삭제" onClick={() => fileDelete(i)} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default FileUpload;
