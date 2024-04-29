import React from "react";
import copy from "@/assets/images/copy.svg";
import { useEntranceCodeState } from "@/store/editorRoomInfoStore";
const EntranceCode = () => {
  const entranceCode = useEntranceCodeState();
  return (
    <div className="entranceCode-container ">
      <p>입장코드</p>
      <div className="entranceCode-copy-container ">
        <h3>{entranceCode}</h3>
        <img src={copy} alt="복사하기" />
      </div>
    </div>
  );
};

export default EntranceCode;
