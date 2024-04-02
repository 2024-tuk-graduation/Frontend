import React, { useContext, useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useHostState } from "@/store/editorRoomInfoStore";
import { WebSocketContext } from "@/context/WebSocketConnect";
import { toast, ToastContainer } from "react-toastify";
import { useLocation } from "react-router-dom";
import "react-toastify/ReactToastify.css";
const CodeEditor = () => {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근
  const host = useHostState();
  const [edit, setEdit] = useState(true); // 이 상태에 따라 에디터가 읽기 전용인지 결정

  const location = useLocation();
  const myNickname = location.state.myNickName;

  const handleEditorChange = (value, event) => {
    if (host === myNickname) {
      stompClient.send(`/pub/code`, JSON.stringify({ codeContent: value }));
      console.log("코드 전송");
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    // 에디터 객체에 접근
    editorRef.current = editor;
    editor.onMouseDown(() => {
      if (host !== myNickname) {
        toast.error("호스트만 입력할 수 있습니다!");
      }
    });
  };

  useEffect(() => {
    if (host === myNickname) {
      setEdit(false);
    }
    if (monaco) {
      import("monaco-themes/themes/Tomorrow.json")
        // import("monaco-themes/themes/Amy.json")
        .then((data) => {
          monaco.editor.defineTheme("theme", data);
        })
        .then(() => monaco.editor.setTheme("theme"));
    }
  }, [monaco]);

  useEffect(() => {
    //
    if (stompClient.connected) {
      //서버로부터 코드 변경 사항을 구독
      stompClient.subscribe("/sub/code", (res) => {
        // 메시지를 받으면, 메시지에 포함된 코드 내용으로 Editor를 업데이트
        const data = JSON.parse(res.body);
        console.log(data);
        if (host !== myNickname) {
          editorRef.current?.setValue(data.codeContent);
        }
      });
    }
  }, [stompClient.connected]);

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
        options={{ fontSize: 15, lineHeight: 20, readOnly: edit }}
      />
      <ToastContainer />
    </div>
  );
};

export default CodeEditor;
