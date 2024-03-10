import React, { useContext, useEffect } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
// import * as StompJs from "@stomp/stompjs";
import Stomp from "webstomp-client";

const webSocketUrl = "ws://43.201.187.179:8080/ws";

const WebSocketContext = React.createContext<any>(Stomp.over(new WebSocket(webSocketUrl), { debug: false }));
export { WebSocketContext };

const CodeEditor = () => {
  const stompClient = useContext(WebSocketContext);

  const connectStomp = () => {
    stompClient.connect(
      {},
      () => {
        // connect 완료
      },
      () => {
        console.error("Can't Connect Stomp");
      }
    );
  };

  // const connect = () => {
  //   try {
  //     const clientdata = new StompJs.Client({
  //       brokerURL: "http://43.201.187.179:8080/ws",
  //       connectHeaders: {
  //         login: "",
  //         passcode: "password",
  //       },
  //       debug: function (str) {
  //         console.log(str);
  //       },
  //       reconnectDelay: 5000, // 자동 재 연결
  //       heartbeatIncoming: 4000,
  //       heartbeatOutgoing: 4000,
  //     });

  //     // // 구독
  //     // clientdata.onConnect = function () {
  //     //   clientdata.subscribe("/sub/channels/", callback);
  //     // };

  //     clientdata.activate(); // 클라이언트 활성화

  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const disConnect = () => {
  //   // 연결 끊기
  //   if (client === null) {
  //     return;
  //   }
  //   client.deactivate();
  // };

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

  useEffect(() => {
    if (stompClient.connected === false) {
      connectStomp();
    }
  }, []);

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
