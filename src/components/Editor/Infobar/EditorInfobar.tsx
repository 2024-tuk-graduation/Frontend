import React, { useState } from "react";
import RadioButton from "./RadioButton";

const EditorInfobar = () => {
  const [checkedValue, setCheckedValue] = useState("blank");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(event.target.value);
  };

  const mode = ["blank", "pdf", "code"];

  return (
    <div className="editor-infobar-container">
      <div className="editor-switch">
        {mode.map((i) => (
          <RadioButton key={i} checkedValue={checkedValue} onChange={handleChange} mode={i} />
        ))}
        <div className="editor-switch__indicator" />
      </div>
      <button className="editor-save-button">저장하기</button>
    </div>
  );
};

export default EditorInfobar;
