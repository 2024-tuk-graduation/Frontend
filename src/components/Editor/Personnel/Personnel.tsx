import { usePersonMenuState } from "@/store/editorMenuStore";
import React, { useContext, useEffect } from "react";
import Menubar from "../PersonMenubar";
import crownIcon from "@/assets/images/crown.svg";
import img3 from "@/assets/images/example/img3.jpg";
import img4 from "@/assets/images/example/img4.png";

import { useEditorRoomInfoActions, useHostState, usePersonnelInfoState } from "@/store/editorRoomInfoStore";
import { WebSocketContext } from "@/context/WebSocketConnect";

import ProfileImg from "./ProfileImg";

const Personnel = () => {
  const personMenu = usePersonMenuState();
  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근
  const hostNickName = useHostState();
  const personnelInfo = usePersonnelInfoState();

  const { setCurrentPersonnel, setPersonnelInfo } = useEditorRoomInfoActions();

  useEffect(() => {
    if (stompClient.connected) {
      stompClient.subscribe(
        `/sub/roomUpdate`,
        (res: any) => {
          const data = JSON.parse(res.body);
          setCurrentPersonnel(data.participantNicknames.length);
          setPersonnelInfo(data.participantNicknames);
        },
        (error: any) => {
          // 오류 처리 로직
          console.error("구독 오류 발생", error);
        }
      );
    }
  }, [stompClient.connected]);

  return (
    <div className={`personnel-container ${personMenu.personnel ? "show" : ""}`}>
      <Menubar />
      <div>
        <p className="personnel-label">현재 편집자</p>
        <div className="current-editor-container">
          <img className="personnel-crown-icon " src={crownIcon} alt="왕관" />
          {hostNickName !== "" && <ProfileImg img={img3} name={hostNickName} editor={true} />}
        </div>
        <p className="personnel-label">현재 시청자</p>
        <div className="current-viewers-container">
          {personnelInfo
            .filter((i) => i !== hostNickName)
            .map((i) => (
              <ProfileImg key={i} img={img4} name={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Personnel;
