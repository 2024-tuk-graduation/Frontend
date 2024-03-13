import React from "react";
import copyIcon from "@/assets/images/copy.svg";
import { useCurrentPersonnelState, useEntranceCodeState, useMaxPersonnelState } from "@/store/editorRoomInfoStore";

const Menubar = () => {
  const entryCode = useEntranceCodeState();
  const maxPersonnel = useMaxPersonnelState();
  const currentPersonnel = useCurrentPersonnelState();
  return (
    <div className="menubar-container">
      <p>{`참여인원(${currentPersonnel - 1}/${maxPersonnel})`}</p>
      <div>
        <p>{entryCode}</p>
        <div>
          <img className="menubar-copyIcon" src={copyIcon} alt="복사하기" />
        </div>
      </div>
    </div>
  );
};

export default Menubar;
