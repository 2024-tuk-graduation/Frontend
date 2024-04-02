import React, { useState } from "react";
import RadioButton from "./RadioButton";
import EntranceCode from "./EntranceCode";
import Record from "./Record";
import AddFile from "./AddFile";
import Time from "./Time";
import Save from "./Save";

const EditorInfobar = () => {
  const [checkedValue, setCheckedValue] = useState("blank");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(event.target.value);
  };

  const mode = ["blank", "pdf", "code"];

  return (
    <div className="editor-infobar-container">
      <div>
        <div className="editor-switch">
          {mode.map((i) => (
            <RadioButton key={i} checkedValue={checkedValue} onChange={handleChange} mode={i} />
          ))}
          <div className="editor-switch__indicator" />
        </div>
        <div className="editor-infobar-buttons ">
          <Record />
          <AddFile />
          <EntranceCode />
          <Time />
          <Save />
        </div>
      </div>
      <button className="editor-save-button">편집자 바꾸기</button>
    </div>
  );
};

export default EditorInfobar;
