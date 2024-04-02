import React, { useRef, useState } from "react";
import uploadIcon from "@/assets/images/upload.svg";
import pdfFile from "@/assets/images/pdfFile.svg";
import trash from "@/assets/images/trash.svg";
const PdfModeCreate = () => {
  const [pdfFileList, setPdfFileList] = useState<Array<File>>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedOption, setSelectedOption] = useState("empty");
  const onPdfFileUpload = (e: any) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const url = URL.createObjectURL(newFile);
      console.log(url);
      // console.log(newFile);
      setPdfFileList((pdfFileList) => [...pdfFileList, newFile]);
    }
  };

  const handleClickFileInput = () => {
    fileInputRef.current?.click();
  };
  const handleClickFileDelete = (fileName: string) => {
    setPdfFileList(pdfFileList.filter((file) => file.name !== fileName));
  };
  return (
    <div className="pdf-mode-create-container">
      <label htmlFor="empty">
        <input
          type="radio"
          name="pdf"
          value="empty"
          id="empty"
          checked={selectedOption === "empty"}
          onChange={() => setSelectedOption("empty")}
        />
        pdf 파일 생략
      </label>
      <label htmlFor="upload">
        <input
          type="radio"
          name="pdf"
          value="upload"
          id="upload"
          checked={selectedOption === "upload"}
          onChange={() => setSelectedOption("upload")}
        />
        pdf 파일 업로드
      </label>
      {selectedOption === "upload" && (
        <div className="pdf-mode-create-upload-container">
          <div className="pdf-mode-upload-area-container">
            {" "}
            <input
              type="file"
              name="pdf"
              id="uploadFile"
              onChange={onPdfFileUpload}
              accept={"application/pdf"}
              ref={fileInputRef}
            />
            <img src={uploadIcon} alt="업로드"></img>
            <p>Drag and drop files here</p>
            <p>-OR-</p>
            <button id="uploadFile" onClick={handleClickFileInput}>
              Browse Files
            </button>
          </div>
          <div className="create-list">
            <p>uploaded files</p>
            {pdfFileList.length !== 0 &&
              pdfFileList.map((i, index) => (
                <div className="create-list-item" key={index}>
                  <img src={pdfFile} alt="pdf파일" />

                  <p>{i.name}</p>
                  <img src={trash} alt="삭제" onClick={() => handleClickFileDelete(i.name)} />
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PdfModeCreate;
