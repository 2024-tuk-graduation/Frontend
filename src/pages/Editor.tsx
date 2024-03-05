import React from "react";
import { CodeEditor, EditorInfobar, EditorRoundButton, Navbar } from "@/components";
import chatIcon from "@/assets/images/chat.svg";
import codeIcon from "@/assets/images/code.svg";
import personnelIcon from "@/assets/images/personnel.svg";
import Compile from "@/components/Editor/Code/Compile";
import { useEditorMenuActions } from "@/store/EditorMenuStore";
import Chat from "@/components/Editor/Chat/Chat";
import Personnel from "@/components/Editor/Personnel/Personnel";

const Editor = () => {
  const { setCompileMenu, setPersonMenu } = useEditorMenuActions();

  return (
    <div className="bg-container editor">
      <div className="container editor">
        <Navbar page={"editor"} />
        <div className="editor-container">
          <EditorInfobar />
          <div className="editor-detail-container">
            <Compile />
            <div className="edit-area">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Editor;
