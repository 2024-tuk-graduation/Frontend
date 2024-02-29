import React from "react";
import copyIcon from "@/assets/images/copy.svg";

const Menubar = () => {
  return (
    <div className="menubar-container">
      <p>참여인원(3/6)</p>
      <div>
        <p className="menubar-entry-code">AJ25B8</p>
        <div>
          <img className="menubar-copyIcon" src={copyIcon} alt="복사하기" />
        </div>
      </div>
    </div>
  );
};

export default Menubar;
