import { useCompileMenuState, useEditorMenuActions } from "@/store/EditorMenuStore";
import React from "react";

const Compile = () => {
  const compileMenu = useCompileMenuState();
  const { setCompileMenu } = useEditorMenuActions();

  return (
    <div className={`compile-container ${compileMenu ? "show" : ""}`}>
      <p>컴파일</p>
      <div onClick={setCompileMenu}>X</div>
    </div>
  );
};

export default Compile;
