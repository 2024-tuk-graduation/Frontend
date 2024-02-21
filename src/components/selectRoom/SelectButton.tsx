import React from "react";

type SelectButtonProps = {
  img: string;
  title: string;
};
const SelectButton = ({ img, title }: SelectButtonProps) => {
  return (
    <button className="selectRoom-btn">
      <div className="selectRoom-btn-container">
        <img className="selectRoom-btn-Icon" src={img} alt={title} />
        <div>
          <p className="selectRoom-btn-Text">{title}</p>
        </div>
      </div>
    </button>
  );
};

export default SelectButton;
