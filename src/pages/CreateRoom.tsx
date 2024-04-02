import { BlankScreenModeSelect, CodeModeSelect, EditorMode, Navbar, PdfModeSelect } from "@/components";
import blankIcon from "@/assets/images/blank.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import codeIcon from "@/assets/images/code.svg";
import arrow from "@/assets/images/arrow.svg";
import React, { ChangeEvent } from "react";
import { useSelectModeActions, useSelectPersonnelState, useSelectRoomNameState } from "@/store/selectModeStore";

const CreateRoom = () => {
  const roomName = useSelectRoomNameState();
  const personnal = useSelectPersonnelState();
  const { increasePersonnal, decreasePersonnal, setName } = useSelectModeActions();

  const onRoomNamehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDecreaseHandle = () => {
    if (personnal > 1) {
      decreasePersonnal();
    }
  };
  const onIncreaseHandle = () => {
    if (personnal < 6) {
      increasePersonnal();
    }
  };
  return (
    <div className="bg-container">
      <div className="container">
        <Navbar />
        <div className="createRoom-container">
          <div className="createRoom-personnal-container">
            <p className="createRoom-label">방 이름</p>
            <input
              className="createRoom-roomName-input"
              type="text"
              onChange={onRoomNamehandler}
              value={roomName}
              required
              maxLength={10}
              placeholder="방 이름을 입력해주세요"
            />
          </div>
          <div className="createRoom-personnal-container">
            <p className="createRoom-label">참여 인원</p>

            <button onClick={() => onDecreaseHandle()}>
              <div className="createRoom-arrow-button">
                <img src={arrow} alt="감소" />
              </div>
            </button>
            <p className="createRoom-personnal">{personnal}</p>
            <button onClick={() => onIncreaseHandle()}>
              <div className="createRoom-arrow-button increase">
                <img src={arrow} alt="증가" />
              </div>
            </button>
          </div>
          <div className="createRoom-editor-mode-container">
            <EditorMode img={blankIcon} title={"빈 화면"} mode="blank" />
            <EditorMode img={pdfIcon} title={"pdf"} mode="pdf" />
            <EditorMode img={codeIcon} title={"code"} mode="code" />
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
