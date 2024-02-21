import { Navbar } from "@/components";
import React from "react";
import createIcon from "@/assets/images/createRoom.svg";
import enterIcon from "@/assets/images/enterRoom.svg";

const SelectRoom = () => {
  return (
    <div className="bg-container">
      <div className="container">
        <Navbar />
        <div className="selectRoom-container">
          <button className="selectRoom-btn">
            <div className="selectRoom-btn-container">
              <img className="selectRoom-btn-Icon" src={createIcon} alt={"방 생성하기"} />
              <div>
                <p className="selectRoom-btn-Text">방 생성하기</p>
              </div>
            </div>
          </button>

          <button>
            <div className="selectRoom-btn-container ">
              <img className="selectRoom-btn-Icon" src={enterIcon} alt={"방 입장하기"} />
              <div>
                <p className="selectRoom-btn-Text">방 입장하기</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRoom;
