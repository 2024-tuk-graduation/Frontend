import React from "react";
import { EditorInfobar, EditorRoundButton, Palette } from "@/components/Editor";
import chatIcon from "@/assets/images/chat.svg";
import personnelIcon from "@/assets/images/personnel.svg";
import Compile from "@/components/Editor/Code/Compile";
import { useEditorMenuActions } from "@/store/editorMenuStore";
import Chat from "@/components/Editor/Chat/VideoChat";
import { WebSocketConnnect } from "@/context";
import { Memo } from "@/components/Editor";
import ModeEditor from "@/components/Editor/ModeEditor";
import WhiteBoard from "@/components/Editor/WhiteBoard";
import { Navbar, QandA } from "@/components";
import SearchSection from "@/components/Editor/SearchSection";
import { useHeightState } from "@/store/editorSection";
import { useEditorRoomInfoActions, useEntranceCodeState } from "@/store/editorRoomInfoStore";
import { editorRoomInfoApi } from "@/hooks/services/queries/useEditorRoomInfo";
import { useQuery } from "@tanstack/react-query";

const Editor = () => {
  const { setPersonMenu } = useEditorMenuActions();
  const height = useHeightState();
  const entranceCode = useEntranceCodeState();
  const {
    setPersonnelInfo,
    setCurrentPersonnel,
    setPdfFileList,
    setCodeFileList,
    setHost,
    setMaxPersonnel,
    setRoomName,
    setLanguage,
    setTemplate,
    setRoomId,
  } = useEditorRoomInfoActions();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["roomInfo"],
    queryFn: () => editorRoomInfoApi(entranceCode),
  });

  if (data) {
    const newData = data.data.data;

    setHost(newData.hostNickname);
    setMaxPersonnel(newData.personnelCount);
    setCurrentPersonnel(newData.participantNicknames.length);
    setRoomName(newData.roomName);
    setTemplate(newData.template);
    setPersonnelInfo(newData.participantNicknames);

    setLanguage(newData.language);
    setRoomId(newData.roomId);
    if (newData.pdfUrls) {
      setPdfFileList(newData.pdfUrls);
    }
    if (newData.codeUrls) {
      setCodeFileList(newData.codeUrls);
    }
    console.log(newData);
  }

  return (
    <WebSocketConnnect>
      <div className="container editor">
        <Navbar page={"editor"} />
        <div className="editor-container editor">
          <EditorInfobar />
          <Palette />
          <div className="editor-detail-container">
            <div className="editor-memo-area">
              <Memo />
              <Compile />
            </div>

            <div className="main-edit-area">
              <div className="button-editor-container">
                <EditorRoundButton handleClick={() => setPersonMenu("chat")} img={chatIcon} title={"chat"} />
                <EditorRoundButton
                  handleClick={() => setPersonMenu("personnel")}
                  img={personnelIcon}
                  title={"personnel"}
                />
                <ModeEditor />
              </div>
              <SearchSection />
              <div className="editor-WhiteBoard-QnA-area" style={{ height }}>
                <WhiteBoard />
                <QandA />
              </div>
            </div>
            <div>
              <Chat />
            </div>
          </div>
        </div>
      </div>
    </WebSocketConnnect>
  );
};

export default Editor;
