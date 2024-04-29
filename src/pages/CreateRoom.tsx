
import { EditorMode, Navbar } from "@/components";
import blankIcon from "@/assets/images/blank.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import codeIcon from "@/assets/images/code.svg";
import arrow from "@/assets/images/arrow.svg";
import React, { ChangeEvent } from "react";
import { useCreateRoomDataActions, useCreateRoomDataState } from "@/store/createRoomStore";
import { useGenericMutation } from "@/hooks/services/mutations/customMutation";
import { createRoomApi } from "@/hooks/services/mutations/useCreateRoom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEditorRoomInfoActions } from "@/store/editorRoomInfoStore";
import { useFileUpload } from "@/hooks";
const CreateRoom = () => {
  const roomData = useCreateRoomDataState();
  const { increasePersonnal, decreasePersonnal, setCreateRoomName } = useCreateRoomDataActions();
  const { setEntranceCode } = useEditorRoomInfoActions();
  const navigate = useNavigate();
  const onEntrySuccess = (data: any) => {
    const newData = data.data.data;
    setEntranceCode(newData.entranceCode);
    navigate(`/editor/${newData.entranceCode}`);
  };
  const onEntryError = () => {
    console.log("createRoom API Error");
  };
  const { mutation: createRoomMutation } = useGenericMutation({
    mutationFn: createRoomApi,
    onSuccessCb: onEntrySuccess,
    onErrorCb: onEntryError,
  });

  const onRoomNamehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setCreateRoomName(e.target.value);
  };

  const onDecreaseHandle = () => {
    if (roomData.personnelCount > 1) {
      decreasePersonnal();
    }
  };
  const onIncreaseHandle = () => {
    if (roomData.personnelCount < 6) {
      increasePersonnal();
    }
  };

  const onCreateRoomHandler = () => {
    const UserObject = {
      language: roomData.codeUrls.language,
      template: roomData.template,
      personnelCount: roomData.personnelCount,
      roomName: roomData.roomName,
    };

    const formData = useFileUpload({
      // files: roomData.pdfUrls,
      files: [...roomData.codeUrls.urls, ...roomData.pdfUrls],
      fileTitle: "uploadFiles",
      data: UserObject,
    });
    console.log(formData);
    createRoomMutation.mutate(formData);

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
              value={roomData.roomName}
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
            <p className="createRoom-personnal">{roomData.personnelCount}</p>
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
          <div className="createRoom-button-container">
            <button onClick={onCreateRoomHandler} className="createRoom-button">
              방 생성하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
