import React, { useState } from "react";

const EditorInfobar = () => {
  const [checkedValue, setCheckedValue] = useState("blank");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckedValue(event.target.value);
  };

  return (
    <div className="editor-infobar-container">
      <div className="editor-switch">
        <input checked={checkedValue === "blank"} onChange={handleChange} id="blank" type="radio" value="blank"></input>
        <label htmlFor="blank" className={`editor-switch__label ${checkedValue === "blank" ? "selected" : ""}`}>
          blank
        </label>
        <input checked={checkedValue === "pdf"} onChange={handleChange} id="pdf" type="radio" value="pdf"></input>
        <label htmlFor="pdf" className={`editor-switch__label ${checkedValue === "pdf" ? "selected" : ""}`}>
          pdf
        </label>
        <input checked={checkedValue === "code"} onChange={handleChange} id="code" type="radio" value="code"></input>
        <label htmlFor="code" className={`editor-switch__label ${checkedValue === "code" ? "selected" : ""}`}>
          code
        </label>
        <div className="editor-switch__indicator" />
      </div>
      <button className="editor-save-button">저장하기</button>
    </div>
  );
};

export default EditorInfobar;
