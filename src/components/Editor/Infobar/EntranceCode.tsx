import React from "react";
import copy from "@/assets/images/copy.svg";
const EntranceCode = () => {
  return (
    <div className="entranceCode-container ">
      <p>입장코드</p>
      <div className="entranceCode-copy-container ">
        <h3>AF24D1</h3>
        <img src={copy} alt="복사하기" />
      </div>
    </div>
  );
};

export default EntranceCode;
