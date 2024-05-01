import { useCanvasActions } from "@/store/canvas";
import React from "react";

const ColorPalette = ({ palette }: { palette: string[] }) => {
  const { setStrokeStyle } = useCanvasActions();
  return (
    <>
      {palette.map((i) => (
        <div
          className="color-option"
          key={i}
          style={{ backgroundColor: `${i}` }}
          data-color={i}
          onClick={(e) => setStrokeStyle(e.target.dataset.color)}
        ></div>
      ))}
    </>
  );
};

export default ColorPalette;
