import { usePersonMenuState } from "@/store/editorMenuStore";
import React, { useContext, useEffect } from "react";
import Menubar from "../Menubar";
import crownIcon from "@/assets/images/crown.svg";
import img1 from "@/assets/images/example/img1.png";
import img2 from "@/assets/images/example/img2.jpeg";
import img3 from "@/assets/images/example/img3.jpg";
import img4 from "@/assets/images/example/img4.png";
import img5 from "@/assets/images/example/img5.png";
import img6 from "@/assets/images/example/img6.png";

import { useEditorRoomInfoActions, usePersonnelInfoState } from "@/store/editorRoomInfoStore";
import { WebSocketContext } from "@/context/WebSocketConnect";
import { useLocation } from "react-router-dom";
import ProfileImg from "./ProfileImg";

const Personnel = () => {
  const personMenu = usePersonMenuState();
  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

  const personnelInfo = usePersonnelInfoState();

  const location = useLocation();
  const { setCurrentPersonnel, setPersonnelInfo, resetPersonnelInfo, setHost } = useEditorRoomInfoActions();
  const initialCurrentPersonnel = location.state.currentPersonnel;
  const initialPersonnelInfo = location.state.personnelInfo;
  const initialHost = location.state.hostNickName;

  console.log(initialHost, initialCurrentPersonnel);

  const imgs = [img1, img2, img3, img4, img5, img6]; // 예시 이미지 경로 배열

  useEffect(() => {
    setCurrentPersonnel(initialCurrentPersonnel);
    resetPersonnelInfo();
    setHost(initialHost);
    initialPersonnelInfo.forEach((name: string, index: number) => {
      const img = imgs[index % imgs.length]; // imgs 배열의 길이로 인덱스를 나누어 반복 사용
      setPersonnelInfo(name, img);
    });
  }, []);

  useEffect(() => {
    if (stompClient.connected) {
      stompClient.subscribe(
        `/sub/roomUpdate`,
        (res: any) => {
          const data = JSON.parse(res.body);
          console.log("구독돼면 오는 데이터", JSON.parse(res.body));
          setCurrentPersonnel(data.participantCount);
          resetPersonnelInfo();
          data.participantNicknames.forEach((name: string, index: number) => {
            const img = imgs[index % imgs.length]; // imgs 배열의 길이로 인덱스를 나누어 반복 사용
            setPersonnelInfo(name, img);
          });
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

          {personnelInfo.length > 0 && (
            <ProfileImg img={personnelInfo[0].img} name={personnelInfo[0].name} editor={true} />
          )}
        </div>
        <p className="personnel-label">현재 시청자</p>
        <div className="current-viewers-container">
          {personnelInfo.slice(1).map((i, index) => (
            <ProfileImg key={index} img={i.img} name={i.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Personnel;
