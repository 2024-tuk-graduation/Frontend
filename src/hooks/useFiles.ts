import { useCodeFileListState, useEditorRoomInfoActions } from "@/store/editorRoomInfoStore";
import {  useSelectFileActions } from "@/store/selectFile";
import { useEffect } from "react";

const useFiles = () => {
  const codeFileList = useCodeFileListState();
  const { addCodeFile } = useEditorRoomInfoActions();
  const { setEditCodeFile } = useSelectFileActions();
  const handleCodeFiles = async ( files  : string[] ) => {

    if (files.length===0) {
      addCodeFile('example1', "");
    } else {

      const fetchPromises = files.map((url: string) =>
        fetch(url)
          .then((response) => {
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text().then((content) => {
              const title = url.split("_")[1];
              addCodeFile(title, content);
            });
          })
          .catch((e) => {
            console.error("Failed to fetch file: ", e);
          })
      );
      await Promise.all(fetchPromises);

    }
  };



  

  useEffect(()=>{
    setEditCodeFile(codeFileList[0]?.title);

    console.log(codeFileList,"dlrjwls")

  },[codeFileList[0]])







  return { handleCodeFiles };
};

export default useFiles;