import { highlighterColorPlatte, penColorPlatte } from "@/data";
import { useCanvasActions, useLineWidthState, usePenTypeState, useStrokeStyleState } from "@/store/canvas";
import React, { useContext, useRef } from "react";

import palette from "@/assets/images/palette.svg";
import { penType } from "@/data/penType";
import { PenType } from "@/types";
import ColorPalette from "./ColorPalette";
import { useCookies } from "react-cookie";
import { useHostState } from "@/store/editorRoomInfoStore";
import { WebSocketContext } from "@/context/WebSocketConnect";

const Palette = () => {
  const lineWidth = useLineWidthState();
  const { setLineWidth, setStrokeStyle, setEraser, setPenType } = useCanvasActions();
  const strokeStyle = useStrokeStyleState();
  const currentPenType = usePenTypeState();
  const colorInputRef = useRef(null);

  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근
  const [cookies] = useCookies(["rememberId"]);
  const host = useHostState();
  const isHost: boolean = host === String(cookies.rememberId);

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

  const onHandlePenType = (toolName: PenType) => {
    setPenType(toolName);
    toolName === "eraser"
      ? (setEraser(true), setStrokeStyle("rgba(0,0,0,1)"))
      : (setEraser(false),
        toolName === "highlighter" ? setStrokeStyle(highlighterColorPlatte[0]) : setStrokeStyle(penColorPlatte[0]));
    // if (isHost) {
    //   stompClient.send(`/pub/canvasdraw/type`, JSON.stringify({ drawType: toolName }));
    // }
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
        onChange={(e) => {
          setLineWidth(Number(e.target.value));
        }}
      />
      <div className="palette-colors">
        {currentPenType === "pen" && (
          <>
            <ColorPalette palette={penColorPlatte} />
            <div className="palette-add-color" onClick={onPaletteClick}>
              <img src={palette} alt="팔레트 색상 더보기" style={{ borderColor: `${strokeStyle}` }} />
              <input
                type="color"
                ref={colorInputRef}
                onChange={(e) => {
                  setStrokeStyle(e.target.value);
                }}
              />
            </div>
          </>
        )}
        {currentPenType === "highlighter" && <ColorPalette palette={highlighterColorPlatte} />}
      </div>
    </div>
  );
};

export default Palette;
