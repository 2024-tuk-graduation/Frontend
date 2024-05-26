import { usePdfFileListState } from "@/store/editorRoomInfoStore";
import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import FileItemTitle from "../FileItemTitle";
import doubleArrow from "@/assets/images/doubleArrow.svg";
import { usePdfState, useSelectFileActions } from "@/store/selectFile";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

const PdfView = () => {
  const pdfFileList = usePdfFileListState();
  const editPdfTitle = usePdfState();
  const [numPages, setNumPages] = useState<number>(1);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { getEditPdfFile } = useSelectFileActions();
  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  const onDocumentError = (error: Error) => {
    console.log("pdf viewer error", error);
  };

  const onDocumentLocked = () => {
    console.log("pdf locked");
  };

  const onhandlePdfPage = (direction: string) => {
    if (pageNumber > 1 && direction === "left") {
      setPageNumber(pageNumber - 1);
    } else if (pageNumber < numPages && direction === "right") {
      setPageNumber(pageNumber + 1);
    }
  };

  return (
    <>
      {pdfFileList.length === 0 ? (
        <div className="no-pdf">
          {" "}
          <p>아직 업로드된 pdf가 없습니다. </p>
          <br />
          <p>pdf를 업로드 해주세요 </p>
        </div>
      ) : (
        <div className="yes-pdf">
          <div className="file-title-list-container">
            {pdfFileList.map((i, index) => (
              <FileItemTitle key={index} fileName={i.fileName} fileType="pdf" />
            ))}
          </div>

          <div className="pdf-content-container">
            <Document
              file={getEditPdfFile(editPdfTitle, pdfFileList) ? getEditPdfFile(editPdfTitle, pdfFileList) : undefined}
              onLoadError={onDocumentError}
              onPassword={onDocumentLocked}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              <Page pageNumber={pageNumber} height={610} />
            </Document>

            <div className="pdf-page-control-container">
              <div className="pdf-arrows-container">
                <div className="pdf-arrow-button" onClick={() => onhandlePdfPage("left")}>
                  <img src={doubleArrow} alt="left" />
                </div>
                <div className="pdf-arrow-button right" onClick={() => onhandlePdfPage("right")}>
                  {" "}
                  <img src={doubleArrow} alt="right" />
                </div>
              </div>
              <div className="pdf-page-info-container">
                <h3>page</h3>
                <div className="pdf-page">
                  <p>
                    {pageNumber} / {numPages}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PdfView;
