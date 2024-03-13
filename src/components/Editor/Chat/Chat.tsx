import { usePersonMenuState } from "@/store/editorMenuStore";
import React from "react";

const Chat = () => {
  const personMenu = usePersonMenuState();
  console.log(personMenu);
  return <div className={`chat-container ${personMenu.chat ? "show" : ""}`}>채팅</div>;
};

export default Chat;
