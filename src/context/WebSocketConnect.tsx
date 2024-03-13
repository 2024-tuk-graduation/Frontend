import React, { useContext, useEffect } from "react";
import Stomp from "webstomp-client";
const webSocketUrl = import.meta.env.VITE_SOCKET_URL;

const WebSocketContext = React.createContext<any>( //Context 생성 // 전역 데이터
  Stomp.over(new WebSocket(webSocketUrl), { debug: false }) // 웹소켓 연결
);
export { WebSocketContext };

const WebSocketConnnect = ({ children }: { children: React.ReactNode }) => {
  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근
  const connectStomp = () => {
    stompClient.connect(
      {},
      (res: any) => {
        console.log(res);
        // connect 완료
      },
      (err: any) => {
        console.log(err);
      }
    );
  };

  useEffect(() => {
    if (stompClient.connected === false) {
      connectStomp(); // 소켓 연결
    }
  }, []);
  return <WebSocketContext.Provider value={stompClient}>{children}</WebSocketContext.Provider>;
};

export default WebSocketConnnect;
