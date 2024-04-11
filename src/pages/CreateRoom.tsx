// import { BlankScreenModeSelect, CodeModeSelect, EditorMode, Navbar, PdfModeSelect } from "@/components";
// import blankIcon from "@/assets/images/blank.svg";
// import pdfIcon from "@/assets/images/pdf.svg";
// import codeIcon from "@/assets/images/code.svg";
// import arrow from "@/assets/images/arrow.svg";
// import React, { ChangeEvent } from "react";
// import { useSelectModeActions, useSelectPersonnelState, useSelectRoomNameState } from "@/store/selectModeStore";

// const CreateRoom = () => {
//   const roomName = useSelectRoomNameState();
//   const personnal = useSelectPersonnelState();
//   const { increasePersonnal, decreasePersonnal, setName } = useSelectModeActions();

//   const onRoomNamehandler = (e: ChangeEvent<HTMLInputElement>) => {
//     setName(e.target.value);
//   };

//   const onDecreaseHandle = () => {
//     if (personnal > 1) {
//       decreasePersonnal();
//     }
//   };
//   const onIncreaseHandle = () => {
//     if (personnal < 6) {
//       increasePersonnal();
//     }
//   };

//   const createRoomHandle = () => {};

//   return (
//     <div className="bg-container">
//       <div className="container">
//         <Navbar />
//         <div className="createRoom-container">
//           <div className="createRoom-personnal-container">
//             <p className="createRoom-label">방 이름</p>
//             <input
//               className="createRoom-roomName-input"
//               type="text"
//               onChange={onRoomNamehandler}
//               value={roomName}
//               required
//               maxLength={10}
//               placeholder="방 이름을 입력해주세요"
//             />
//           </div>
//           <div className="createRoom-personnal-container">
//             <p className="createRoom-label">참여 인원</p>

//             <button onClick={() => onDecreaseHandle()}>
//               <div className="createRoom-arrow-button">
//                 <img src={arrow} alt="감소" />
//               </div>
//             </button>
//             <p className="createRoom-personnal">{personnal}</p>
//             <button onClick={() => onIncreaseHandle()}>
//               <div className="createRoom-arrow-button increase">
//                 <img src={arrow} alt="증가" />
//               </div>
//             </button>
//           </div>
//           <div className="createRoom-editor-mode-container">
//             <EditorMode img={blankIcon} title={"빈 화면"} mode="blank" />
//             <EditorMode img={pdfIcon} title={"pdf"} mode="pdf" />
//             <EditorMode img={codeIcon} title={"code"} mode="code" />
//           </div>{" "}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CreateRoom;

import { BlankScreenModeSelect, CodeModeSelect, EditorMode, Navbar, PdfModeSelect } from "@/components";
import blankIcon from "@/assets/images/blank.svg";
import pdfIcon from "@/assets/images/pdf.svg";
import codeIcon from "@/assets/images/code.svg";
import arrow from "@/assets/images/arrow.svg";
import React, { ChangeEvent, useState } from "react";
import { useSelectModeActions, useSelectPersonnelState, useSelectRoomNameState } from "@/store/selectModeStore";
import axios from "axios";

const CreateRoom = () => {
  const roomName = useSelectRoomNameState();
  const personnal = useSelectPersonnelState();
  const { increasePersonnal, decreasePersonnal, setName } = useSelectModeActions();
  const [isLoading, setIsLoading] = useState(false); // API 호출 중인지 여부를 나타내는 상태

  const onRoomNamehandler = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onDecreaseHandle = () => {
    if (personnal > 1) {
      decreasePersonnal();
    }
  };
  const onIncreaseHandle = () => {
    if (personnal < 6) {
      increasePersonnal();
    }
  };

  const createRoomHandle = async () => {
    setIsLoading(true); // API 호출 시작 시 로딩 상태 변경

    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append("language", "Python");
      formData.append("template", "1");
      formData.append("personnelCount", personnal.toString());
      formData.append("roomName", roomName);

      // API 호출
      const response = await axios.post("/createRoom", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // API 호출 성공 시
      console.log(response.data); // 서버로부터 받은 응답 데이터 출력
      // TODO: 원하는 작업 수행
    } catch (error) {
      // API 호출 실패 시
      console.error("Error creating room:", error);
      // TODO: 에러 처리
    }

    setIsLoading(false); // API 호출 종료 시 로딩 상태 변경
  };

  return (
    <div className="bg-container">
      <div className="container">
        <Navbar />
        <div className="createRoom-container">
          <div className="createRoom-personnal-container">
            <p className="createRoom-label">방 이름</p>
            <input
              className="createRoom-roomName-input"
              type="text"
              onChange={onRoomNamehandler}
              value={roomName}
              required
              maxLength={10}
              placeholder="방 이름을 입력해주세요"
            />
          </div>
          <div className="createRoom-personnal-container">
            <p className="createRoom-label">참여 인원</p>

            <button onClick={() => onDecreaseHandle()}>
              <div className="createRoom-arrow-button">
                <img src={arrow} alt="감소" />
              </div>
            </button>
            <p className="createRoom-personnal">{personnal}</p>
            <button onClick={() => onIncreaseHandle()}>
              <div className="createRoom-arrow-button increase">
                <img src={arrow} alt="증가" />
              </div>
            </button>
          </div>
          <div className="createRoom-editor-mode-container">
            <EditorMode img={blankIcon} title={"빈 화면"} mode="blank" />
            <EditorMode img={pdfIcon} title={"pdf"} mode="pdf" />
            <EditorMode img={codeIcon} title={"code"} mode="code" />
          </div>{" "}
          {/* 방 생성하기 버튼 */}
          <button className="createRoom-create-button" onClick={createRoomHandle} disabled={isLoading}>
            {isLoading ? "생성 중..." : "방 생성하기"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
