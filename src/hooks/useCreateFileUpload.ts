import { useCreateRoomDataActions } from '@/store/createRoomStore';
import React, { useRef } from 'react';

const useCreateFileUpload = () => {
  const { addPdfFiles, removePdfFile, addCodeFiles, removeCodeFile } = useCreateRoomDataActions();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, action: (file: File) => void) => {
    const newFile = e.target.files ? e.target.files[0] : null;
    if (newFile) {
      action(newFile);
    }
  };

  const onClickFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleFileDelete = (file: File, action: (file: File) => void) => {
    action(file);
  };

  return {
    onClickFileInput,
    fileInputRef,
    onPdfFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e, addPdfFiles),
    onCodeFileUpload: (e: React.ChangeEvent<HTMLInputElement>) => handleFileUpload(e, addCodeFiles),
    onPdfFileDelete: (file: File) => handleFileDelete(file, removePdfFile),
    onCodeFileDelete: (file: File) => handleFileDelete(file, removeCodeFile),
  };
};

export default useCreateFileUpload;