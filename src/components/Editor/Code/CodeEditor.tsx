import React, { useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import WebSocketConnnect from "../WebSocketConnect";

const CodeEditor = () => {
  const monaco = useMonaco();
  useEffect(() => {
    if (monaco) {
      import("monaco-themes/themes/Tomorrow.json")
        // import("monaco-themes/themes/Amy.json")
        .then((data) => {
          monaco.editor.defineTheme("theme", data);
        })
        .then(() => monaco.editor.setTheme("theme"));
    }
  }, [monaco]);

  return (
    <WebSocketConnnect>
      <div className="code-editor-container">
        <Editor
          theme="theme"
          height="63rem"
          width="99%"
          language="python"
          defaultValue="#코드를 입력해주세용용용용"
          options={{ fontSize: 15, lineHeight: 20 }}
        />
      </div>
    </WebSocketConnnect>
  );
};

export default CodeEditor;
