import React from "react";

interface RadioButtonPropsType {
  checkedValue: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  mode: string;
}
const RadioButton = ({ checkedValue, onChange, mode }: RadioButtonPropsType) => {
  return (
    <>
      <input checked={checkedValue === mode} onChange={onChange} id={mode} type="radio" value={mode}></input>
      <label htmlFor={mode} className={`editor-switch__label ${checkedValue === mode ? "selected" : ""}`}>
        {mode}
      </label>
    </>
  );
};

export default RadioButton;
