import React, { MutableRefObject, RefObject, useContext, useEffect } from "react";
import { useCookies } from "react-cookie";
import { WebSocketContext } from "@/context/WebSocketConnect";
import { useHostState, useRoomId } from "@/store/editorRoomInfoStore";
import { useMyCamState, useMyVoiceState, useVideoChatActions } from "@/store/videoChat";
import crown from "@/assets/images/crown.svg";
import voiceOFF from "@/assets/images/voiceOFF.svg";
import voiceON from "@/assets/images/voiceON.svg";
import camOFF from "@/assets/images/camOFF.svg";
import camON from "@/assets/images/camON.svg";
import MyVideoStatus from "./MyVideoStatus";

interface VideoCamPropsType {
  streamRef: MutableRefObject<MediaStream | undefined>;
  videoRef: RefObject<HTMLVideoElement>;
  remote: boolean;
  nickname: string;
}
const VideoCam = ({ streamRef, videoRef, remote, nickname }: VideoCamPropsType) => {
  const stompClient = useContext(WebSocketContext);
  const [cookies] = useCookies(["rememberId"]);
  const roomId = useRoomId();
  const { setMyCam, setMyVoice } = useVideoChatActions();
  const myCam = useMyCamState();
  const myVoice = useMyVoiceState();

  const host = useHostState();

  const hostCam = (String(cookies.rememberId) === host && !remote) || (String(cookies.rememberId) !== host && remote);

  const camClickHandler = () => {
    // 자신의 스트림의 첫 번째 비디오 트랙을 가져옴

    const videoTrack = streamRef.current?.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.enabled = !videoTrack.enabled; // 트랙의 활성화 상태를 반전시킴
      setMyCam(); // 카메라 상태를 저장하기 위한 상태 업데이트
    }
  };

  useEffect(() => {
    stompClient.send(
      `/pub/media/status/${roomId}/${String(cookies.rememberId)}`,
      JSON.stringify({
        cam: myCam,
        voice: myVoice,
      })
    );
  }, [myCam, myVoice]);

  const muteClickHandler = () => {
    const audioTrack = streamRef.current?.getAudioTracks()[0];
    if (audioTrack) {
      audioTrack.enabled = !audioTrack.enabled;
      setMyVoice();
    }
  };

  return (
    <div className={`video-cam-container ${hostCam ? "host" : ""}`}>
      <div className="video-cam-info">
        <div className="crown-img ">{hostCam && <img src={crown} alt="왕관" />}</div>

        <div className="video-cam-nickname">
          <p>{nickname}</p>
        </div>

        {!remote ? (
          <div className="video-status">
            <MyVideoStatus handler={camClickHandler} img={myCam ? camON : camOFF} my={myCam ? "ON" : "OFF"} />
            <MyVideoStatus handler={muteClickHandler} img={myVoice ? voiceON : voiceOFF} my={myVoice ? "ON" : "OFF"} />
          </div>
        ) : (
          <></>
          // <div className="video-status">
          //   <RemoteVideoStatus img={remoteCam ? camON : camOFF} remote={remoteCam ? "ON" : "OFF"} />
          //   <RemoteVideoStatus img={remoteVoice ? voiceON : voiceOFF} remote={remoteVoice ? "ON" : "OFF"} />
          // </div>
        )}
      </div>
      <video ref={videoRef} autoPlay />
    </div>
  );
};

export default VideoCam;
