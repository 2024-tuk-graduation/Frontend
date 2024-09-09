import { highlighterColorPlatte, penColorPlatte } from "@/data";
import { useLineWidthState, usePenTypeState, useStrokeStyleState } from "@/store/canvas";
import React, { useRef } from "react";
import palette from "@/assets/images/palette.svg";
import { penType } from "@/data/penType";
import ColorPalette from "./ColorPalette";
import useCanvasDetail from "@/hooks/useCanvasDetail";

const Palette = () => {
  const lineWidth = useLineWidthState();
  const strokeStyle = useStrokeStyleState();
  const currentPenType = usePenTypeState();
  const colorInputRef = useRef(null);
  const { onHandlePenType, onHandlePenLineWidth, onHandleStrokeStyle } = useCanvasDetail();
  const sliderStyle = {
    background: `linear-gradient(to right, ${strokeStyle} ${(lineWidth / 30) * 100}%, #CCCCCC ${(lineWidth / 30) * 100}%)`,
    width: "18rem",
    height: "0.7rem",
    borderRadius: "8px",
    outline: "none",
    transition: "background 450ms ease-in",
    WebkitAppearance: "none",
    cursor: "pointer",
    margin: "3rem",
  };

  const onPaletteClick = () => {
    colorInputRef.current?.click(); // input type color 클릭 트리거
  };

  return (
    <div className="palette-container">
      {Object.entries(penType).map(([toolName, icon]) => (
        <div
          style={{
            border: currentPenType === toolName ? "2px solid blue" : "none", // 조건부 스타일 적용
          }}
          key={toolName}
          className="palette-item"
          onClick={() => onHandlePenType(toolName)}
        >
          <img src={icon} alt={toolName} />
        </div>
      ))}

      <input
        type="range"
        min={1}
        max={30}
        value={lineWidth}
        step={0.1}
        style={sliderStyle}
        className="palette-item-thickness"
        onChange={(e) => onHandlePenLineWidth(e.target.value)}
      />
      <div className="palette-colors">
        {currentPenType === "pen" && (
          <>
            <ColorPalette palette={penColorPlatte} />
            <div className="palette-add-color" onClick={onPaletteClick}>
              <img src={palette} alt="팔레트 색상 더보기" style={{ borderColor: `${strokeStyle}` }} />
              <input type="color" ref={colorInputRef} onChange={(e) => onHandleStrokeStyle(e.target.value)} />
            </div>
          </>
        )}
        {currentPenType === "highlighter" && <ColorPalette palette={highlighterColorPlatte} />}
      </div>
    </div>
  );
};

export default Palette;
