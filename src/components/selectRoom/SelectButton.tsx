import React from "react";
import { useModalActions } from "@/store/modalStore";
import { EntryModal } from "..";
import { useNavigate } from "react-router-dom";
type SelectButtonProps = {
  img: string;
  title: string;
};
const SelectButton = ({ img, title }: SelectButtonProps) => {
  const { setModalOpen } = useModalActions();
  const navigate = useNavigate();

  const handleOpen = () => {
    title === "방 입장하기" ? setModalOpen("entry") : navigate("/edit");
  };
  return (
    <div>
      <EntryModal />
      <button className="selectRoom-btn" onClick={() => handleOpen()}>
        <div className="selectRoom-btn-container">
          <img className="selectRoom-btn-Icon" src={img} alt={title} />
          <div>
            <p className="selectRoom-btn-Text">{title}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default SelectButton;
