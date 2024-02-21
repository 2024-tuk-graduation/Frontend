import { Navbar } from "@/components";
import React from "react";
import createIcon from "@/assets/images/createRoom.svg";
import enterIcon from "@/assets/images/enterRoom.svg";

const SelectRoom = () => {
  return (
    <div className="bg-container">
      <div className="container">
        <Navbar />
        <div>
          <button>
            <div>
              <img src={createIcon} alt={"방 생성하기"} />
              <div>
                <p></p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectRoom;
