import React, { useState } from "react";

import { useCreateRoomDataState } from "@/store/createRoomStore";

import SelectUpload from "./SelectUpload";
import FileUpload from "./FileUpload";
import useCreateFileUpload from "@/hooks/useCreateFileUpload";
const PdfModeCreate = () => {
  const [selectedPdfOption, setSelectedPdfOption] = useState("empty");
  const roomData = useCreateRoomDataState();

  const { onPdfFileUpload, onPdfFileDelete } = useCreateFileUpload();

  return (
    <div>
      <SelectUpload mode={"pdf"} select={selectedPdfOption} setSelect={setSelectedPdfOption} />
      {selectedPdfOption === "upload" && (
        <FileUpload
          name="pdf"
          id="uploadPdfFile"
          accept="application/pdf"
          files={roomData.pdfUrls}
          fileUpload={onPdfFileUpload}
          fileDelete={onPdfFileDelete}
        />
      )}
    </div>
  );
};

export default PdfModeCreate;
