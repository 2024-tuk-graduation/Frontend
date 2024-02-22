import React from "react";
import Modal from "react-modal";
import closeIcon from "@/assets/images/close.svg";
import { Type, useModalActions } from "@/store/modalStore";
type BaseModalPropsType = {
  isOpen: boolean;
  children: React.ReactNode;
  type: Type;
};

const BaseModal = ({ isOpen, children, type }: BaseModalPropsType) => {
  const { setModalOpen } = useModalActions();

  const onCloseHandler = (type: Type) => {
    setModalOpen(type);
  };

  return (
    <Modal
      isOpen={isOpen}
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          width: "100%",
          boxSizing: "border-box",
        },
        content: {
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          width: "50rem",
          height: "38rem",
          boxSizing: "border-box",
          overflow: "auto",
          borderRadius: "3rem",
          position: "relative",
          backgroundColor: "rgba(255, 255, 255, 0.78)",
        },
      }}
    >
      <img className={"modal-close-img"} src={closeIcon} alt={"닫기"} onClick={() => onCloseHandler(type)}></img>
      {children}
    </Modal>
  );
};

export default BaseModal;
