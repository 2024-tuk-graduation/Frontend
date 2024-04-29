import React from "react";
import template1 from "@/assets/images/template/template1.png";
import template2 from "@/assets/images/template/template2.png";
import template3 from "@/assets/images/template/template3.png";
import template4 from "@/assets/images/template/template4.png";
import template5 from "@/assets/images/template/template5.png";
import template6 from "@/assets/images/template/template6.png";
import { useCreateRoomDataActions, useCreateRoomDataState } from "@/store/createRoomStore";

const BlankScreenModeCreate = () => {
  const templates = [template1, template2, template3, template4, template5, template6]; // 예시 이미지 경로 배열
  const roomData = useCreateRoomDataState();
  const { setBlankTemplate } = useCreateRoomDataActions();

  return (
    <div className="blank-screen-mode-create-container">
      <p>template을 선택해주세요</p>

      <div>
        {templates.map((item, index) => (
          <img
            key={index}
            src={item}
            alt={`template${index + 1}`}
            onClick={() => {
              setBlankTemplate(index + 1);
            }}
            className={roomData.template === index + 1 ? "template-selected" : ""} // 조건부 스타일 적용
          />
        ))}
      </div>
    </div>
  );
};

export default BlankScreenModeCreate;
