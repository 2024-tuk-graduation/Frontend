import { EditorInfobar, Navbar } from "@/components";
import React from "react";

const Editor = () => {
  return (
    <div className="bg-container editor">
      <div className="container editor">
        <Navbar page={"editor"} />
        <div className="editor-container">
          <EditorInfobar />
        </div>
      </div>
    </div>
  );
};

export default Editor;
