import React from "react";

interface EditorRoundButtonPropsType {
  handleClick: React.MouseEventHandler<HTMLButtonElement>;
  img: string;
  title: string;
}
const EditorRoundButton = ({ handleClick, img, title }: EditorRoundButtonPropsType) => {
  return (
    <button className={`editor-round-button-container ${title}`} onClick={handleClick}>
      <div>
        <img src={img} alt={title}></img>
      </div>
    </button>
  );
};

export default EditorRoundButton;
