import React, { useEffect, useState } from "react";
import { EditorInfobar, Palette } from "@/components/Editor";
import { Compile } from "@/components/Editor";
import { VideoChat } from "@/components/Editor";
import { QandA } from "@/components/Editor";
import { WebSocketConnnect } from "@/context";
import { ModeEditor } from "@/components/Editor";
import { Navbar } from "@/components";
import { useEditorRoomInfoActions, useEntranceCodeState } from "@/store/editorRoomInfoStore";
import { editorRoomInfoApi } from "@/hooks/services/queries/useEditorRoomInfo";
import { useQuery } from "@tanstack/react-query";
import useFiles from "@/hooks/useFiles";
import { useSelectFileActions } from "@/store/selectFile";
import { usePersonMenuState } from "@/store/EditorMenuStore";

const Editor = () => {
  const entranceCode = useEntranceCodeState();
  const { handleCodeFiles } = useFiles();
  const [, setModeEditor] = useState(false);
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
    queryKey: ["roomInfo", entranceCode],
    queryFn: () => {
      console.log("Fetching room info...");
      return editorRoomInfoApi(entranceCode);
    },
    staleTime: 5 * 60 * 10000, // 5 minutes
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
          setEditPdfFile(newData.pdfUrls[0]?.fileName);
        }

        await handleCodeFiles(newData.codeUrls.urls);
        setModeEditor(true);
      }
    };
    updateRoomInfo();
  }, [data]);

  return (
    <WebSocketConnnect>
      <div className="container editor">
        <Navbar page={"editor"} />
        <div className="editor-container editor">
          <EditorInfobar />
          <Palette />
          <div className="editor-detail-container">
            <div className="editor-memo-area">
              {/* <Memo /> */}
              <Compile />
            </div>
            <div className="main-edit-area">
              <ModeEditor />
            </div>
            <div>
              {personMenu.chat && <VideoChat />}
              {personMenu.qna && <QandA />}
            </div>
          </div>
        </div>
      </div>
    </WebSocketConnnect>
  );
};

export default Editor;
