import React from "react";
import { EditorInfobar, EditorRoundButton, Palette } from "@/components/Editor";
import chatIcon from "@/assets/images/chat.svg";
import codeIcon from "@/assets/images/code2.svg";
import personnelIcon from "@/assets/images/personnel.svg";
import Compile from "@/components/Editor/Code/Compile";
import { useEditorMenuActions } from "@/store/editorMenuStore";
import Chat from "@/components/Editor/Chat/Chat";
import Personnel from "@/components/Editor/Personnel/Personnel";
import { WebSocketConnnect } from "@/context";
import { Memo } from "@/components/Editor";
import ModeEditor from "@/components/Editor/ModeEditor";
import WhiteBoard from "@/components/Editor/WhiteBoard";
import { Navbar, QandA } from "@/components";
import SearchSection from "@/components/Editor/SearchSection";
import { useHeightState } from "@/store/editorSection";

const Editor = () => {
  const { setPersonMenu } = useEditorMenuActions();
  const height = useHeightState();
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
              <div className="mode-editor-container">
                <EditorRoundButton handleClick={() => setPersonMenu("chat")} img={chatIcon} title={"chat"} />
                <EditorRoundButton
                  handleClick={() => setPersonMenu("personnel")}
                  img={personnelIcon}
                  title={"personnel"}
                />
                <ModeEditor />
              </div>
              {/* <SearchSection ></SearchSection> */}
              <div className="editor-WhiteBoard-QnA-area" style={{ height }}>
                <WhiteBoard />
                <QandA />
              </div>
            </div>
            <div>
              <Chat />
              <Personnel />
            </div>
          </div>

          {/* <div className="editor-detail-container">
            <div className="edit-area">
              <Compile />
              <EditorRoundButton handleClick={setCompileMenu} img={codeIcon} title={"code"} />
              <EditorRoundButton handleClick={() => setPersonMenu("chat")} img={chatIcon} title={"chat"} />
              <EditorRoundButton
                handleClick={() => setPersonMenu("personnel")}
                img={personnelIcon}
                title={"personnel"}
              />{" "}
              <CodeEditor />
            </div>
            <Chat />
            <Personnel />
          </div> */}
        </div>
      </div>
    </WebSocketConnnect>
  );
};

export default Editor;
