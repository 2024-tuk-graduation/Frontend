import React, { useRef, useState } from "react";
import recordImg from "@/assets/images/record.svg";
import recordStopImg from "@/assets/images/recordStop.svg";
const Record = () => {
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const [time, setTime] = useState(0);
  const timeIntervalRef = useRef(null);

  // 녹화된 미디어 데이터를 임시 저장 . 녹화가 종료되면 이 배열의 데이터를 사용하여 비디오 파일을 생성
  let data: BlobPart[] = [];
  const startRecording = async () => {
    const videoStream = await navigator.mediaDevices.getDisplayMedia({ video: true });
    const audioStream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const combinedStream = new MediaStream([...videoStream.getTracks(), ...audioStream.getTracks()]);
    // 스트림 트랙에 onended 이벤트 핸들러 추가

    combinedStream.getTracks().forEach((track) => {
      track.onended = () => {
        stopRecording(); // 스트림 종료 감지 시 녹화 중지 처리
      };
    });

    const recorder = new MediaRecorder(combinedStream);

    recorder.ondataavailable = (e) => data.push(e.data);
    recorder.onstop = () => {
      const completeBlob = new Blob(data, { type: "video/webm" });
      const videoURL = URL.createObjectURL(completeBlob);

      const a = document.createElement("a");
      a.href = videoURL;
      a.download = "recorded-video.webm";
      a.click();

      data = [];
    };

    recorder.start();
    mediaRecorderRef.current = recorder;
    setIsRecording(true);

    timeIntervalRef.current = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000); // 매초마다 타이머 업데이트
  };
  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      clearInterval(timeIntervalRef.current);
      setTime(0);
    }
  };

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min}:${sec < 10 ? "0" + sec : sec}`;
  };

  return (
    <div className="record-container" onClick={startRecording}>
      <div className={isRecording ? "" : "notRecord-container"}>
        <img className={isRecording ? "recording-img" : ""} src={recordImg} alt="녹화하기" />
        <p className={isRecording ? "recording-time" : ""}>{isRecording ? `${formatTime(time)}` : "rec"}</p>
      </div>
      {isRecording && (
        <div className="record-stop-img-container" onClick={stopRecording} style={{ cursor: "pointer" }}>
          <img src={recordStopImg} alt="녹화종료" />
        </div>
      )}
    </div>
  );
};

export default Record;
