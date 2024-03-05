import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";

const CodeEditor = () => {
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      import("monaco-themes/themes/Tomorrow.json")
        // import("monaco-themes/themes/Brilliance Black.json")
        .then((data) => {
          monaco.editor.defineTheme("theme", data);
        })
        .then(() => monaco.editor.setTheme("theme"));
    }
  }, [monaco]);
  return (
    <div className="code-editor-container">
      <Editor
        theme="theme"
        height="95rem"
        width="99%"
        language="python"
        defaultValue="#코드를 입력해주세용용용용"
        options={{ fontSize: 20, lineHeight: 23 }}
      />
    </div>
  );
};

export default CodeEditor;
