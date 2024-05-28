import React, { useContext, useEffect, useRef, useState } from "react";
import Editor, { useMonaco } from "@monaco-editor/react";
import { useCodeFileListState, useHostState, useLanguageState } from "@/store/editorRoomInfoStore";
import { WebSocketContext } from "@/context/WebSocketConnect";
import { useCookies } from "react-cookie";
import { useCompileActions } from "@/store/compile";
import { useCodeState, useSelectFileActions } from "@/store/selectFile";
import FileItemTitle from "../FileItemTitle";
import useCanvas from "@/hooks/useCanvas";
import EditorRoundButton from "../EditorRoundButton";
import pencilImg from "@/assets/images/pencil.svg";
import codeImg from "@/assets/images/code3.svg";
import Clear from "../Palatte/Clear";
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

  const [isDrawingMode, setIsDrawingMode] = useState(false); // 그림 모드 상태

  const { clearCanvas, canvasRef, containerRef, resizeCanvas } = useCanvas(isDrawingMode);

  useEffect(() => {
    if (!isDrawingMode) {
      resizeCanvas();
    }
  }, [resizeCanvas, isDrawingMode]);

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
        .then((data) => {
          monaco.editor.defineTheme("theme", data);
        })
        .then(() => monaco.editor.setTheme("theme"));
    }
  }, [monaco]);

  useEffect(() => {
    if (stompClient.connected) {
      stompClient.subscribe("/sub/code", (res) => {
        const data = JSON.parse(res.body);
        console.log(data);
        if (host !== String(cookies.rememberId)) {
          editorRef.current?.setValue(data.codeContent);
        }
      });
    }
  }, [stompClient.connected]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    resizeCanvas();
  };

  const toggleDrawingMode = () => {
    setIsDrawingMode((prevMode) => !prevMode);
    resizeCanvas(); // Ensure canvas is resized correctly when toggling mode
  };

  return (
    <div>
      <EditorRoundButton
        handleClick={toggleDrawingMode}
        img={isDrawingMode ? `${pencilImg} ` : `${codeImg} `}
        title={isDrawingMode ? "그리기" : "코드입력"}
      />

      <div className="file-title-list-container">
        <Clear handleClear={clearCanvas} />
        {codeFileList.map((i, index) => (
          <FileItemTitle key={index} fileName={i.title} fileType="code" />
        ))}
      </div>

      <div ref={containerRef} style={{ border: "solid 1px #ececec", width: "100%", position: "relative" }}>
        <Editor
          theme="theme"
          height="66rem"
          width="100%"
          language={selectedLanguage}
          onChange={handleEditorChange}
          onMount={handleEditorDidMount}
          defaultValue={
            getEditCodeFile(editCodeTitle, codeFileList) ? getEditCodeFile(editCodeTitle, codeFileList) : undefined
          }
          options={{
            zIndex: isDrawingMode ? 1 : 9999,
            border: "#000",
            fontSize: 15,
            lineHeight: 20,
            readOnly: edit,
          }}
        />
        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: isDrawingMode ? 9999 : 1,
            pointerEvents: isDrawingMode ? "auto" : "none",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
