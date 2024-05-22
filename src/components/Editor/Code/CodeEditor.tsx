import React, { useContext, useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useCodeFileListState, useHostState, useLanguageState } from "@/store/editorRoomInfoStore";
import { WebSocketContext } from "@/context/WebSocketConnect";
import "react-toastify/ReactToastify.css";
import { useCookies } from "react-cookie";
import { useCompileActions } from "@/store/compile";
import { useCodeState, useSelectFileActions } from "@/store/selectFile";

const CodeEditor = () => {
  const monaco = useMonaco();
  const editorRef = useRef<any>(null);
  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근
  const host = useHostState();
  const selectedLanguage = useLanguageState();
  const [edit, setEdit] = useState(true); // 이 상태에 따라 에디터가 읽기 전용인지 결정
  const [cookies] = useCookies(["rememberId"]);
  const codeFileList = useCodeFileListState();
  const { setCode } = useCompileActions();
  const editCodeTitle = useCodeState();
  const { getEditCodeFile } = useSelectFileActions();
  const handleEditorChange = (value, event) => {
    if (host === String(cookies.rememberId)) {
      stompClient.send(`/pub/code`, JSON.stringify({ codeContent: value }));
      console.log("코드 전송");
    }
    setCode(value);
  };

  useEffect(() => {
    if (editorRef.current) {
      const codeContent = getEditCodeFile(editCodeTitle, codeFileList);
      editorRef.current.setValue(codeContent);
    }
  }, [editCodeTitle, codeFileList]);

  useEffect(() => {
    if (host === String(cookies.rememberId)) {
      setEdit(false);
    }
    if (monaco) {
      import("monaco-themes/themes/Clouds.json")
        // import("monaco-themes/themes/Amy.json")
        .then((data) => {
          monaco.editor.defineTheme("theme", data);
        })
        .then(() => monaco.editor.setTheme("theme"));
    }
  }, [monaco]);

  useEffect(() => {
    if (stompClient.connected) {
      //서버로부터 코드 변경 사항을 구독

      stompClient.subscribe("/sub/code", (res) => {
        // 메시지를 받으면, 메시지에 포함된 코드 내용으로 Editor를 업데이트
        const data = JSON.parse(res.body);
        console.log(data);
        if (host !== String(cookies.rememberId)) {
          editorRef.current?.setValue(data.codeContent);
        }
      });
    }
  }, [stompClient.connected]);

  const handleEditorDidMount = (editor, monaco) => {
    // 에디터 객체에 접근
    editorRef.current = editor;
  };
  return (
    <div style={{ border: "solid 1px #ececec", width: "100%" }}>
      <Editor
        theme="theme"
        height="50rem"
        width="100%"
        language={selectedLanguage}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount}
        defaultValue={getEditCodeFile(editCodeTitle, codeFileList)}
        options={{ border: "#000", fontSize: 15, lineHeight: 20, readOnly: edit }}
      />
    </div>
  );
};

export default CodeEditor;
