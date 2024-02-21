import React from "react";
import { Link } from "react-router-dom";
import homeIcon from "@/assets/images/home.svg";
import profileIcon from "@/assets/images/user.svg";

const Navbar = () => {
  return (
    <div className="navbar-container">
      <Link to={"/"}>
        {" "}
        <img className="navbar-icon" src={homeIcon} alt={"홈"} />
      </Link>
      <h1 className="navbar-Logo">Logo</h1>
      <Link to={"profile"}>
        <img className="navbar-icon" src={profileIcon} alt={"프로필"} />
      </Link>
    </div>
  );
};

export default Navbar;
