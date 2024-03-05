import { useCompileMenuState } from "@/store/EditorMenuStore";
import React from "react";

const Compile = () => {
  const compileMenu = useCompileMenuState();
  return <div className={`compile-container ${compileMenu ? "show" : ""}`}>컴파일</div>;
};

export default Compile;
