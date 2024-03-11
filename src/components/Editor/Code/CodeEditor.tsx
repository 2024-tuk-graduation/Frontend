import React, { useContext, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import Stomp from "webstomp-client";

const webSocketUrl = import.meta.env.VITE_SOCKET_URL;

const WebSocketContext = React.createContext<any>(Stomp.over(new WebSocket(webSocketUrl), { debug: false }));
export { WebSocketContext };

const CodeEditor = () => {
  const stompClient = useContext(WebSocketContext);

  const connectStomp = () => {
    stompClient.connect(
      {},
      (res: any) => {
        console.log(res);
        // connect 완료
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

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
    if (stompClient.connected === false) {
      connectStomp();
    }
  }, [monaco]);

  return (
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
  );
};

export default CodeEditor;
