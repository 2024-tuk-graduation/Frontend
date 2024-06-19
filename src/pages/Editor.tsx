import React, { useEffect, useState } from "react";
import { EditorInfobar, Palette } from "@/components/Editor";
import Compile from "@/components/Editor/Code/Compile";
import Chat from "@/components/Editor/Chat/VideoChat";
import QandA from "@/components/Editor/QandA";
import { WebSocketConnnect } from "@/context";
import { Memo } from "@/components/Editor";
import ModeEditor from "@/components/Editor/ModeEditor";
import { Navbar } from "@/components";
import { useEditorRoomInfoActions, useEntranceCodeState, usePdfFileListState } from "@/store/editorRoomInfoStore";
import { editorRoomInfoApi } from "@/hooks/services/queries/useEditorRoomInfo";
import { useQuery } from "@tanstack/react-query";
import useFiles from "@/hooks/useFiles";
import { useSelectFileActions } from "@/store/selectFile";
import { useEditorMenuActions, usePersonMenuState } from "@/store/EditorMenuStore";
import chatIcon from "@/assets/images/chat.svg";
import qna1 from "@/assets/images/qna1.svg";

const Editor = () => {
  const { setPersonMenu } = useEditorMenuActions();
  const entranceCode = useEntranceCodeState();
  const { handleCodeFiles } = useFiles();
  const [modeEditor, setModeEditor] = useState(false);
  const pdfFileList = usePdfFileListState();
  const { setEditPdfFile } = useSelectFileActions();
  const personMenu = usePersonMenuState();
  const {
    setPersonnelInfo,
    setCurrentPersonnel,
    setPdfFileList,
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

  useEffect(() => {
    const updateRoomInfo = async () => {
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
        console.log(newData.codeUrls);
        await handleCodeFiles(newData.codeUrls.urls);

        setModeEditor(true);
      }
    };

    updateRoomInfo();
  }, [data]);

  useEffect(() => {
    setEditPdfFile(pdfFileList[0]?.fileName);
  }, [pdfFileList]);

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
              <ModeEditor />
            </div>
            <div>
              {personMenu.chat && <Chat />}
              {personMenu.qna && <QandA />}
            </div>
          </div>
        </div>
      </div>
    </WebSocketConnnect>
  );
};

export default Editor;
