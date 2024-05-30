import React, { useState, useEffect } from "react";
import { useEditorModalState, useModalActions } from "@/store/modalStore";
import { useEditorRoomInfoActions, useEntranceCodeState, useHostState } from "@/store/editorRoomInfoStore";
import { changeHostApi, changeHostApiPropsType } from "@/hooks/services/mutations/useChangeHost";
import { useGenericMutation } from "@/hooks/services/mutations/customMutation";
import BaseModal from "./BaseModal";
import ParticipantsList from "../Editor/ParticipantsList";

const EditorModal = () => {
  const editorModal = useEditorModalState();
  // const { setModalOpen } = useModalActions();
  const { setHost } = useEditorRoomInfoActions();
  const entranceCode = useEntranceCodeState();
  const currentHostNickname = useHostState();
  const [selectedHost, setSelectedHost] = useState<string | null>(null);

  const onChangeHostSuccess = (data: any) => {
    console.log("호스트 변경 성공");
    const newData = data.data.data;
    setHost(newData.hostNickname);
    // setModalOpen("editor");
  };

  const onChangeHostError = () => {
    console.log("호스트 변경 실패");
  };

  const { mutation: changeHostMutation } = useGenericMutation({
    mutationFn: changeHostApi,
    onSuccessCb: onChangeHostSuccess,
    onErrorCb: onChangeHostError,
  });

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedHost) {
      const hostData: changeHostApiPropsType = {
        entranceCode: entranceCode,
        currentHostNickname: currentHostNickname,
        newHostNickname: selectedHost,
      };
      changeHostMutation.mutate(hostData);
    }
  };

  return (
    <BaseModal isOpen={editorModal} type={"editor"}>
      <form onSubmit={onSubmitHandler} className="editor-modal-container">
        <h1 className="editor-modal-title">참여 인원 목록</h1>

        <div>
          <ParticipantsList
            onSelect={(participant: React.SetStateAction<string | null>) => setSelectedHost(participant)}
          />
        </div>

        <button type="submit" className="entry-modal-button">
          변경하기
        </button>
      </form>
    </BaseModal>
  );
};

export default EditorModal;
