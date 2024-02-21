import { Navbar, SelectButton } from "@/components";
import React from "react";
import createIcon from "@/assets/images/createRoom.svg";
import enterIcon from "@/assets/images/enterRoom.svg";

const SelectRoom = () => {
  return (
    <div className="bg-container">
      <div className="container">
        <Navbar />
        <div className="selectRoom-container">
          <SelectButton img={createIcon} title={"방 생성하기"} />
          <SelectButton img={enterIcon} title={"방 입장하기"} />
        </div>
      </div>
    </div>
  );
};

export default SelectRoom;
