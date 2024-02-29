import { usePersonMenuState } from "@/store/EditorMenuStore";
import React from "react";

const Personnel = () => {
  const personMenu = usePersonMenuState();
  return <div className={`personnel-container ${personMenu.personnel ? "show" : ""}`}>참여인원</div>;
};

export default Personnel;
