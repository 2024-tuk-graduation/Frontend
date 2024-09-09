import useCanvasDetail from "@/hooks/useCanvasDetail";
import { useCanvasActions } from "@/store/canvas";
import React from "react";

const ColorPalette = ({ palette }: { palette: string[] }) => {
  const { onHandleStrokeStyle } = useCanvasDetail();

  return (
    <>
      {palette.map((i) => (
        <div
          className="color-option"
          key={i}
          style={{ backgroundColor: `${i}` }}
          data-color={i}
          onClick={(e) => onHandleStrokeStyle(e.target.dataset.color)}
        ></div>
      ))}
    </>
  );
};

export default ColorPalette;
