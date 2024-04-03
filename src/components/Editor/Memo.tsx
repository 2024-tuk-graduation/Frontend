import { Default } from "node_modules/react-toastify/dist/utils";
import React from "react";
import { DefaultMenubar } from ".";

const Memo = () => {
  return (
    <div className="memo-container">
      <DefaultMenubar title="메모장" />
    </div>
  );
};

export default Memo;
