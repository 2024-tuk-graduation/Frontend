import React from "react";
import RadioButton from "./RadioButton";
import EntranceCode from "./EntranceCode";
import Record from "./Record";
import AddFile from "./AddFile";
import Time from "./Time";
import Save from "./Save";
import {
  useEditorRoomInfoActions,
  useModeState,
  useHostState,
  usePersonnelInfoState,
} from "@/store/editorRoomInfoStore";
import { useModalActions } from "@/store/modalStore";
import { useCookies } from "react-cookie";
import { Editor } from "@monaco-editor/react";
import EditorModal from "@/components/modal/EditorModal";

const EditorInfobar = () => {
  const { setMode } = useEditorRoomInfoActions();
  const mode = useModeState();
  const { setModalOpen } = useModalActions();
  const currentHost = useHostState();
  const currentUser = usePersonnelInfoState();
  const [cookies, setCookie, removeCookie] = useCookies(["rememberId"]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMode(event.target.value);
  };

  const modeContent = ["blank", "pdf", "code"];

  const handleNowEditor = () => {
    if (currentHost === String(cookies.rememberId)) {
      setModalOpen("editor");
      console.log("현재 편집자 : ", currentHost);
    }
  };

  return (
    <div className="editor-infobar-container">
      <div>
        <div className="editor-switch">
          {modeContent.map((i) => (
            <RadioButton key={i} checkedValue={mode} onChange={handleChange} mode={i} />
          ))}
          <div className="editor-switch__indicator" />
        </div>
        <div className="editor-infobar-buttons">
          <Record />
          <AddFile />
          <EntranceCode />
          <Time />
          <Save />
        </div>
      </div>
      {currentHost === String(cookies.rememberId) ? (
        <button className="editor-save-button" onClick={handleNowEditor}>
          편집자 바꾸기
        </button>
      ) : null}
      <EditorModal />
    </div>
  );
};

export default EditorInfobar;
