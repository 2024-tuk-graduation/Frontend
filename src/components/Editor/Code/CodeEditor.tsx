import React, { useContext, useEffect, useRef } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useHostState } from "@/store/editorRoomInfoStore";
import { WebSocketContext } from "@/context/WebSocketConnect";

const CodeEditor = () => {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근
  const host = useHostState();
  const handleEditorChange = (value, event) => {
    if (host === localStorage.getItem("NickName")) {
      stompClient.send(``, JSON.stringify({ content: value }));
      console.log("코드 전송");
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    //에디터 객체에 접근
    editorRef.current = editor;
    // console.log(editor.setValue("dfdf"));
    // console.log(editor.getValue());
  };

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

  // useEffect(() => {
  //   //
  //   if (stompClient.connected) {
  //     //서버로부터 코드 변경 사항을 구독
  //     stompClient.subscribe("", (res) => {
  //       // 메시지를 받으면, 메시지에 포함된 코드 내용으로 Editor를 업데이트
  //       const data = JSON.parse(res.body);
  //       if (host !== localStorage.getItem("NickName")) {
  //         editorRef.current?.setValue(data);
  //       }
  //     });
  //   }
  // }, [stompClient.connected]);

  return (
    <div className="code-editor-container">
      <Editor
        theme="theme"
        height="63rem"
        width="99%"
        language="python"
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        defaultValue="#코드를 입력해주세용용용용"
        options={{ fontSize: 15, lineHeight: 20 }}
      />
    </div>
  );
};

export default CodeEditor;
