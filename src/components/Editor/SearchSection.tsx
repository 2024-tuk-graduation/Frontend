import { useEditorSectionActions, useHeightState } from "@/store/editorSection";
import React, { useEffect, useState } from "react";

const SearchSection = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [initialY, setInitialY] = useState(0);
  // const [width, setWidth] = useState(500);
  const height = useHeightState();
  const { setHeight } = useEditorSectionActions();
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsResizing(true);
    setInitialY(e.clientY);
  };

  const handleMouseUp = () => {
    setIsResizing(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isResizing) {
      const newWidth = height + e.clientY - initialY;
      setInitialY(e.clientY);
      if (newWidth >= 430 && newWidth <= 800) {
        setHeight(newWidth);
      }
    }
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  return <div className="search-section-container" onMouseDown={handleMouseDown}></div>;
};

export default SearchSection;
