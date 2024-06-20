import { WebSocketContext } from "@/context/WebSocketConnect";
import {
  useCurrentPersonnelState,
  useEditorRoomInfoActions,
  useHostState,
  useMaxPersonnelState,
  usePersonnelInfoState,
  useRoomId,
} from "@/store/editorRoomInfoStore";
import React, { useEffect, useRef, useContext, useCallback } from "react";
import { useCookies } from "react-cookie";
import { usePersonMenuState, useEditorMenuActions } from "@/store/EditorMenuStore";
import VideoCam from "./VideoCam";

const VideoChat = () => {
  const host = useHostState();
  const [cookies] = useCookies(["rememberId"]);
  const roomId = useRoomId();
  const { setHost, setCurrentPersonnel, setPersonnelInfo } = useEditorRoomInfoActions();
  const curentPersonnel = useCurrentPersonnelState();
  const maxPersonnel = useMaxPersonnelState();
  const participants = usePersonnelInfoState().filter((i) => i !== host);
  const remotePerson = usePersonnelInfoState().filter((i) => i !== String(cookies.rememberId));

  // 자신의 비디오 // HTMLVideoElement
  const myVideoRef = useRef<HTMLVideoElement>(null);
  // 다른사람의 비디오
  const remoteVideoRef = useRef<HTMLVideoElement>(null);

  const stompClient = useContext(WebSocketContext);
  const streamRef = useRef<MediaStream>();

  // peerConnection
  const peerRef = useRef<RTCPeerConnection>();
  const iceCandidatesQueue = useRef<RTCIceCandidate[]>([]);

  const setupPeerConnection = useCallback(() => {
    if (peerRef.current) {
      peerRef.current.close();
    }
    // peerConnection 생성
    // iceServers는 stun sever설정이며 google의 public stun server를 사용하였습니다.
    peerRef.current = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });

    peerRef.current.onicecandidate = (e) => {
      if (e.candidate) {
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

    // 상대방으로부터 전송된 미디어 트랙을 수신
    peerRef.current.ontrack = (e) => {
      if (remoteVideoRef.current) {
        remoteVideoRef.current.srcObject = e.streams[0];
      }
    };

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => peerRef.current?.addTrack(track, streamRef.current!));
    }
  }, [stompClient, roomId]);

  useEffect(() => {
    setupPeerConnection();
    //자신의 미디어 스트림을 받기
    const getMedia = async () => {
      try {
        // 자신이 원하는 자신의 스트림정보
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        streamRef.current = stream;
        if (myVideoRef.current) {
          myVideoRef.current.srcObject = stream;
        }
        // 스트림을 peerConnection에 등록
        stream.getTracks().forEach((track) => peerRef.current?.addTrack(track, stream));
      } catch (e) {
        console.error(e);
      }
    };

    getMedia();
  }, [setupPeerConnection]);

  //A->B offer 생성
  const createOffer = async () => {
    if (!peerRef.current || !stompClient.connected) return;
    try {
      // offer 생성
      const sdp = await peerRef.current.createOffer();
      // 자신의 sdp로 LocalDescription 설정
      await peerRef.current.setLocalDescription(sdp);
      stompClient.send(
        `/pub/peer/offer/${roomId}`,
        JSON.stringify({ type: sdp.type, content: sdp.sdp, roomId: String(roomId) })
      );
    } catch (e) {
      console.error(e);
    }
  };

  const createAnswer = async (sdp: RTCSessionDescription) => {
    // sdp : PeerA에게서 전달받은 offer
    if (!peerRef.current || !stompClient.connected) return;
    try {
      // PeerA가 전달해준 offer를 RemoteDescription에 등록
      await peerRef.current.setRemoteDescription(sdp);

      // answer생성해주고
      const answerSdp = await peerRef.current.createAnswer();

      // answer를 LocalDescription에 등록 (PeerB 기준)
      await peerRef.current.setLocalDescription(answerSdp);

      // answer 전달
      stompClient.send(
        `/pub/peer/answer/${roomId}`,
        JSON.stringify({ type: "answer", content: answerSdp.sdp, roomId: String(roomId) })
      );

      while (iceCandidatesQueue.current.length) {
        const candidate = iceCandidatesQueue.current.shift();
        if (candidate) {
          peerRef.current.addIceCandidate(candidate).catch((e) => console.error("addIceCandidate error:", e));
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const subscribeToOffers = () => {
      if (stompClient.connected && host !== String(cookies.rememberId)) {
        return stompClient.subscribe(
          `/sub/peer/offer/${roomId}`,
          (res) => {
            const data = JSON.parse(res.body);
            const sdp = new RTCSessionDescription({ type: data.type, sdp: data.content });
            peerRef.current
              .setRemoteDescription(sdp)
              .then(() => {
                setTimeout(() => createAnswer(sdp), 500);
              })
              .catch((e) => console.error("setRemoteDescription error:", e));
          },
          (error) => console.error("Subscription error:", error)
        );
      }
      return null;
    };

    const subscribeToAnswers = () => {
      if (stompClient.connected && host === String(cookies.rememberId)) {
        return stompClient.subscribe(
          `/sub/peer/answer/${roomId}`,
          (res) => {
            const data = JSON.parse(res.body);
            const sdp = new RTCSessionDescription({ type: data.type, sdp: data.content });
            peerRef.current.setRemoteDescription(sdp).catch((e) => console.error("setRemoteDescription error:", e));
          },
          (error) => console.error("Subscription error:", error)
        );
      }
      return null;
    };

    const subscribeToIceCandidates = () => {
      if (stompClient.connected) {
        return stompClient.subscribe(
          `/sub/peer/iceCandidate/${roomId}`,
          (res) => {
            const data = JSON.parse(res.body);
            const candidate = new RTCIceCandidate({
              candidate: data.content,
              sdpMid: data.sdpMid,
              sdpMLineIndex: data.sdpMLineIndex,
            });
            if (peerRef.current.remoteDescription) {
              peerRef.current.addIceCandidate(candidate).catch((e) => console.error("addIceCandidate error:", e));
            } else {
              iceCandidatesQueue.current.push(candidate);
            }
          },
          (error) => console.error("Subscription error:", error)
        );
      }
      return null;
    };

    const offerSubscription = subscribeToOffers();
    const answerSubscription = subscribeToAnswers();
    const iceCandidateSubscription = subscribeToIceCandidates();

    return () => {
      offerSubscription?.unsubscribe();
      answerSubscription?.unsubscribe();
      iceCandidateSubscription?.unsubscribe();
    };
  }, [stompClient.connected, host, cookies.rememberId, roomId]);

  useEffect(() => {
    const updateRoomInfo = (res: any) => {
      const data = JSON.parse(res.body);
      setCurrentPersonnel(data.participantNicknames.length);
      setPersonnelInfo(data.participantNicknames);
      if (host === String(cookies.rememberId)) {
        setTimeout(createOffer, 500); // Only host creates the offer
      }
    };

    if (stompClient.connected) {
      const subscription = stompClient.subscribe(`/sub/roomUpdate`, updateRoomInfo, (error) => {
        console.error("구독 오류 발생", error);
      });
      return () => subscription.unsubscribe();
    }
  }, [stompClient.connected, setCurrentPersonnel, setPersonnelInfo, cookies.rememberId, host]);

  useEffect(() => {
    const MediaStatusUrl = host === String(cookies.rememberId) ? participants[0] : host;
    const mediaStatusSubscription = stompClient.subscribe(
      `/sub/media/status/${roomId}/${MediaStatusUrl}`,
      (res) => {
        const data = JSON.parse(res.body);
        console.log(data.cam, data.voice);
      },
      (error) => console.error("Subscription error:", error)
    );
    return () => mediaStatusSubscription.unsubscribe();
  }, [stompClient.connected, host, participants, roomId]);

  const { setPersonMenu } = useEditorMenuActions();

  const openQnA = () => {
    setPersonMenu("qna");
  };

  return (
    <div className="video-container">
      <div className="personnel-container">
        <div>
          <p>{`참여인원 (${curentPersonnel} / ${maxPersonnel})`}</p>
          <button onClick={openQnA}>Q&A</button>
        </div>
      </div>
      <VideoCam nickname={String(cookies.rememberId)} streamRef={streamRef} videoRef={myVideoRef} remote={false} />
      <VideoCam nickname={remotePerson[0]} streamRef={streamRef} videoRef={remoteVideoRef} remote={true} />
    </div>
  );
};

export default VideoChat;
