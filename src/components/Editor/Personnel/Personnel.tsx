import { usePersonMenuState } from "@/store/EditorMenuStore";
import React from "react";
import Menubar from "../Menubar";
import crownIcon from "@/assets/images/crown.svg";
import profileImg from "@/assets/images/부리3.jpeg";
import ProfileImg from "./ProfileImg";

const Personnel = () => {
  const personMenu = usePersonMenuState();

  const person = [
    { name: "티노", img: profileImg },
    { name: "지혜", img: profileImg },
    { name: "민기", img: profileImg },
    { name: "정의훈", img: profileImg },
    { name: "교수님", img: profileImg },
  ];
  return (
    <div className={`personnel-container ${personMenu.personnel ? "show" : ""}`}>
      <Menubar />
      <div>
        <p className="personnel-label">현재 편집자</p>
        <div className="current-editor-container">
          <img className="personnel-crown-icon " src={crownIcon} alt="왕관" />
          <ProfileImg img={profileImg} name={"솔휘"} editor={true} />
        </div>
        <p className="personnel-label">현재 시청자</p>
        <div className="current-viewers-container">
          {person.map((i, index) => (
            <ProfileImg key={index} img={i.img} name={i.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Personnel;
