import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "@/assets/images/home.svg";
import profileIcon from "@/assets/images/user.svg";
import backIcon from "@/assets/images/back.svg";
import { useRoomNameState } from "@/store/editorRoomInfoStore";

interface NavbarPropsType {
  page?: string;
}
const Navbar = ({ page }: NavbarPropsType) => {
  const roomName = useRoomNameState();
  return (
    <div className="navbar-container">
      {" "}
      {page === "editor" ? (
        <div className="navbar-editor">
          <Link to={"/selectRoom"}>
            {" "}
            <img className="navbar-icon editor" src={backIcon} alt={"뒤로가기"} />
          </Link>
          <h1 className="navbar-Logo editor">{roomName}</h1>
        </div>
      ) : (
        <div className="navbar-default">
          <Link to={"/"}>
            {" "}
            <img className="navbar-icon" src={homeIcon} alt={"홈"} />
          </Link>
          <h1 className="navbar-Logo">Logo</h1>
          <Link to={"profile"}>
            <img className="navbar-icon" src={profileIcon} alt={"프로필"} />
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
