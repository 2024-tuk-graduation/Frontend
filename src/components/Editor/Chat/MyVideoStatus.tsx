import React from "react";

interface MyVideoStatusPropsType {
  handler: React.MouseEventHandler<HTMLButtonElement>;
  img: string;
  my: string;
}
const MyVideoStatus = ({ handler, img, my }: MyVideoStatusPropsType) => {
  return (
    <button className={`video-control-btn ${my === "ON" ? "on" : ""} `} onClick={handler}>
      <img src={img} />
    </button>
  );
};

export default MyVideoStatus;
