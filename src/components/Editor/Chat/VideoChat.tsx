import { WebSocketContext } from "@/context/WebSocketConnect";
import {
  useCurrentPersonnelState,
  useEditorRoomInfoActions,
  useHostState,
  useMaxPersonnelState,
  usePersonnelInfoState,
  useRoomId,
} from "@/store/editorRoomInfoStore";
import React, { useEffect, useRef, useContext } from "react";
import { useCookies } from "react-cookie";

import VideoCam from "./VideoCam";

const VideoChat = () => {
  const host = useHostState();

  const [cookies] = useCookies(["rememberId"]);

  const roomId = useRoomId();
  const { setHost } = useEditorRoomInfoActions();
  const curentPersonnel = useCurrentPersonnelState();
  const maxPersonnel = useMaxPersonnelState();

  const participants = usePersonnelInfoState().filter((i) => i !== host);
  const remotePerson = usePersonnelInfoState().filter((i) => i !== String(cookies.rememberId));

  // 자신의 비디오 // HTMLVideoElement
  const myVideoRef = useRef<HTMLVideoElement>(null);
  // 다른사람의 비디오
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const stompClient = useContext(WebSocketContext);

  const { setCurrentPersonnel, setPersonnelInfo } = useEditorRoomInfoActions();

  const streamRef = useRef<MediaStream>();
  // peerConnection
  const peerRef = useRef<RTCPeerConnection>();

  useEffect(() => {
    if (stompClient.connected) {
      stompClient.subscribe(
        `/sub/roomUpdate`,
        (res) => {
          const data = JSON.parse(res.body);
          setCurrentPersonnel(data.participantNicknames.length);
          setPersonnelInfo(data.participantNicknames);
          setTimeout(createOffer, 1000);
          setHost(data.hostNickname);
          console.log("아강", data);
        },
        (error: any) => {
          console.error("구독 오류 발생", error);
        }
      );
    }
  }, [stompClient.connected]);

  //자신의 미디어 스트림을 받기
  const getMedia = async () => {
    try {
      // 자신이 원하는 자신의 스트림정보
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      streamRef.current = stream;
      if (myVideoRef.current) {
        myVideoRef.current.srcObject = stream;
      }

      // 스트림을 peerConnection에 등록
      stream.getTracks().forEach((track) => peerRef.current?.addTrack(track, stream));

      // 상대방으로부터 전송된 미디어 트랙을 수신
      peerRef.current.ontrack = (e) => {
        if (remoteVideoRef.current) {
          remoteVideoRef.current.srcObject = e.streams[0];
        }
      };
    } catch (e) {
      console.error(e);
    }
  };

  //A->B offer 생성
  const createOffer = async () => {
    console.log("create Offer");
    if (!(peerRef.current && stompClient.connected)) {
      return;
    }
    try {
      // offer 생성
      const sdp = await peerRef.current.createOffer();

      // 자신의 sdp로 LocalDescription 설정
      peerRef.current.setLocalDescription(sdp);
      console.log("sent the offer");
      stompClient.send(
        `/pub/peer/offer/${roomId}`,
        JSON.stringify({
          type: sdp.type,
          content: sdp.sdp, // 실제 SDP 데이터
          roomId: String(roomId),
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    // sdp : PeerA에게서 전달받은 offer
    console.log("createAnswer");
    if (!(peerRef.current && stompClient.connected)) {
      return;
    }

    try {
      // PeerA가 전달해준 offer를 RemoteDescription에 등록
      peerRef.current.setRemoteDescription(sdp);

      // answer생성해주고
      const answerSdp = await peerRef.current.createAnswer();

      // answer를 LocalDescription에 등록 (PeerB 기준)
      peerRef.current.setLocalDescription(answerSdp);

      console.log("sent the answer");

      // answer 전달
      stompClient.send(
        `/pub/peer/answer/${roomId}`,
        JSON.stringify({
          type: "answer",
          content: answerSdp.sdp,
          roomId: String(roomId),
        })
      );
    } catch (e) {
      console.error(e);
    }
  };

  const iceHandler = () => {
    // iceCandidate 이벤트 // WebRTC 연결에 필요한 ICE 후보를 상대방에게 공유
    peerRef.current.onicecandidate = (e) => {
      if (e.candidate) {
        console.log(e.candidate);
        // // ICE 후보를 상대방에게 공유 //
        stompClient.send(
          `/pub/peer/iceCandidate/${roomId}`,
          JSON.stringify({
            type: "iceCandidate",
            content: e.candidate.candidate,
            sdpMLineIndex: e.candidate.sdpMLineIndex,
            sdpMid: e.candidate.sdpMid,
            roomId: String(roomId),
          })
        );
      }
    };
  };
  useEffect(() => {
    // peerConnection 생성
    // iceServers는 stun sever설정이며 google의 public stun server를 사용하였습니다.
    peerRef.current = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    iceHandler();

    if (stompClient.connected) {
      // offer를 받는 구독 로직
      if (host !== String(cookies.rememberId)) {
        stompClient.subscribe(
          `/sub/peer/offer/${roomId}`,
          (res) => {
            const data = JSON.parse(res.body);
            console.log("Received offer:", data);
            setTimeout(() => {
              createAnswer(new RTCSessionDescription({ type: data.type, sdp: data.content }));
            }, 5000); //
          },
          (error) => {
            console.error("Subscription error:", error);
          }
        );
      }

      // answer를 받는 구독 로직
      if (host === String(cookies.rememberId)) {
        stompClient.subscribe(
          `/sub/peer/answer/${roomId}`,
          (res) => {
            const data = JSON.parse(res.body);
            console.log("recv answer");
            console.log(data);
            // 새로운 RTCSessionDescription 객체 생성
            const sdp = new RTCSessionDescription({
              type: data.type,
              sdp: data.content,
            });
            peerRef.current.setRemoteDescription(sdp);
          },
          (error) => {
            console.error("Subscription error:", error);
          }
        );
      }
    }

    // ICE Candidate 구독 로직
    stompClient.subscribe(
      `/sub/peer/iceCandidate/${roomId}`,
      (res) => {
        const data = JSON.parse(res.body);
        // console.log("Received ICE candidate:", data);
        const candidate = new RTCIceCandidate({
          candidate: data.content,
          sdpMid: data.sdpMid,
          sdpMLineIndex: data.sdpMLineIndex,
        });
        console.log("Received ICE candidate:", candidate);
        peerRef.current?.addIceCandidate(candidate);
      },
      (error) => {
        console.error("Subscription error:", error);
      }
    );
    getMedia();
  }, [stompClient.connected]);

  useEffect(() => {
    const MediaStatusUrl = host === String(cookies.rememberId) ? participants[0] : host;

    stompClient.subscribe(
      `/sub/media/status/${roomId}/${MediaStatusUrl}`,
      (res) => {
        const data = JSON.parse(res.body);

        console.log(data.cam, data.voice);
      },
      (error) => {
        console.error("Subscription error:", error);
      }
    );
  }, [stompClient.connected, participants]);

  return (
    <div className="video-container">
      <div className="personnel-container">
        <p>{`참여인원 (${curentPersonnel} / ${maxPersonnel})`}</p>
      </div>
      <VideoCam nickname={String(cookies.rememberId)} streamRef={streamRef} videoRef={myVideoRef} remote={false} />
      <VideoCam nickname={remotePerson[0]} streamRef={streamRef} videoRef={remoteVideoRef} remote={true} />
    </div>
  );
};

export default VideoChat;
