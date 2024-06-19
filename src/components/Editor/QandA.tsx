// // // // // import React, { useContext, useEffect, useState } from "react";
// // // // // import { DefaultMenubar } from ".";
// // // // // import { WebSocketContext } from "@/context/WebSocketConnect";
// // // // // import { usePersonMenuState, useEditorMenuActions } from "@/store/EditorMenuStore";
// // // // // import axios from "axios";

// // // // // interface ChatMessage {
// // // // //   type: "question" | "answer";
// // // // //   content: string;
// // // // // }

// // // // // const QandA: React.FC = () => {
// // // // //   const { setPersonMenu } = useEditorMenuActions();
// // // // //   const [chat, setChat] = useState(""); // 채팅 내용 담는 변수
// // // // //   const [chatList, setChatList] = useState<ChatMessage[]>([]);

// // // // //   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null); // 선택된 질문 인덱스 상태
// // // // //   const [answerContent, setAnswerContent] = useState<string>(""); // 답변 내용 상태

// // // // //   const serverURL = `${import.meta.env.VITE_APP_API_URL}/qna`;

// // // // //   const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

// // // // //   const openChat = () => {
// // // // //     setPersonMenu("chat");
// // // // //   };

// // // // //   useEffect(() => {
// // // // //     if (stompClient.connected) {
// // // // //       // 웹소켓 연결 상태가 되면 채팅 구독
// // // // //       stompClient.subscribe("/sub/qna", (message: any) => {
// // // // //         const newMessage: ChatMessage = JSON.parse(message.body); // 새로운 메시지 파싱
// // // // //         setChatList((prev) => [...prev, newMessage]); // 채팅 목록에 추가
// // // // //       });
// // // // //     }
// // // // //   }, [stompClient.connected]);

// // // // //   const handleClickQuestion = (index: number) => {
// // // // //     setSelectedQuestionIndex(index); // 클릭된 질문의 인덱스 저장
// // // // //   };

// // // // //   const handleSubmitAnswer = (event: React.FormEvent<HTMLFormElement>) => {
// // // // //     event.preventDefault();
// // // // //     if (selectedQuestionIndex !== null) {
// // // // //       const selectedQuestion = chatList[selectedQuestionIndex];
// // // // //       sendAnswer(selectedQuestion.content, answerContent); // 선택된 질문에 대한 답변 전송
// // // // //     }
// // // // //   };

// // // // //   const sendAnswer = async (questionContent: string, answer: string) => {
// // // // //     const answerMessage: ChatMessage = {
// // // // //       type: "answer",
// // // // //       content: answer,
// // // // //     };

// // // // //     // 답변 메시지를 서버로 전송 (axios 사용)
// // // // //     try {
// // // // //       const response = await axios.post(serverURL, answerMessage);
// // // // //       console.log("답변 전송 성공 : ", response.data);
// // // // //       // 여기서 서버 응답에 대한 추가 처리를 할 수 있습니다.
// // // // //     } catch (error) {
// // // // //       console.error("답변 전송 오류:", error);
// // // // //     }

// // // // //     // 선택된 질문 초기화 및 입력 필드 초기화
// // // // //     setAnswerContent("");
// // // // //     setSelectedQuestionIndex(null);
// // // // //   };

// // // // //   const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // // //     setAnswerContent(event.target.value); // 입력 필드 내용 변경 시 상태 업데이트
// // // // //   };

// // // // //   // 채팅 목록을 매핑하여 각 질문과 답변을 표시하는 JSX
// // // // //   const msgBox = chatList.map((item, idx) => {
// // // // //     const isSelected = idx === selectedQuestionIndex; // 선택된 질문 여부
// // // // //     return (
// // // // //       <div
// // // // //         key={idx}
// // // // //         className={`chat-box ${item.type === "question" ? "question" : "answer"} ${isSelected ? "selected" : ""}`}
// // // // //         onClick={() => handleClickQuestion(idx)} // 질문 클릭 시 처리
// // // // //       >
// // // // //         <span>{item.content}</span> {/* 질문 또는 답변 내용 표시 */}
// // // // //       </div>
// // // // //     );
// // // // //   });

// // // // //   return (
// // // // //     <div className="video-container">
// // // // //       <div className="personnel-container">
// // // // //         <div>
// // // // //           <p>Q&A</p>
// // // // //           <button onClick={openChat}>Video</button>
// // // // //         </div>
// // // // //       </div>

// // // // //       <div className="">{msgBox}</div>

// // // // //       <form id="qna-submit-form" onSubmit={handleSubmitAnswer}>
// // // // //         <div className="qna-input-container">
// // // // //           <input
// // // // //             type="text"
// // // // //             id="msg"
// // // // //             value={answerContent}
// // // // //             placeholder="내용을 입력하세요"
// // // // //             className="qna-input-field"
// // // // //             onChange={handleChangeAnswer}
// // // // //           />
// // // // //           <button className="qna-submit-button" type="submit">
// // // // //             전송
// // // // //           </button>{" "}
// // // // //         </div>
// // // // //       </form>
// // // // //     </div>
// // // // //   );
// // // // // };

// // // // // export default QandA;

// // // // import React, { useContext, useEffect, useState } from "react";
// // // // import { WebSocketContext } from "@/context/WebSocketConnect";
// // // // import { useEditorMenuActions } from "@/store/EditorMenuStore";
// // // // import axios from "axios";

// // // // interface ChatMessage {
// // // //   type: "question" | "answer";
// // // //   content: string;
// // // // }

// // // // const QandA: React.FC = () => {
// // // //   const { setPersonMenu } = useEditorMenuActions();
// // // //   // const [chat, setChat] = useState(""); // 채팅 내용 담는 변수
// // // //   const [chatList, setChatList] = useState<ChatMessage[]>([]);
// // // //   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null); // 선택된 질문 인덱스 상태
// // // //   const [answerContent, setAnswerContent] = useState<string>(""); // 답변 내용 상태

// // // //   const serverURL = `${import.meta.env.VITE_APP_API_URL}/qna`; // 서버 URL 설정

// // // //   const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

// // // //   useEffect(() => {
// // // //     const subscribeToQna = () => {
// // // //       if (stompClient && stompClient.connected) {
// // // //         // 웹소켓 연결 상태가 되면 채팅 구독
// // // //         stompClient.subscribe("/sub/qna", (message: any) => {
// // // //           const newMessage: ChatMessage = JSON.parse(message.body); // 새로운 메시지 파싱
// // // //           setChatList((prev) => [...prev, newMessage]); // 채팅 목록에 추가
// // // //         });
// // // //       }
// // // //     };

// // // //     subscribeToQna();

// // // //     return () => {
// // // //       // Clean up function
// // // //       if (stompClient && stompClient.connected) {
// // // //         stompClient.disconnect();
// // // //       }
// // // //     };
// // // //   }, [stompClient]); // stompClient가 변경될 때마다 구독을 새로 설정하고 해제

// // // //   const handleClickQuestion = (index: number) => {
// // // //     setSelectedQuestionIndex(index); // 클릭된 질문의 인덱스 저장
// // // //   };

// // // //   const handleSubmitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
// // // //     event.preventDefault();
// // // //     if (selectedQuestionIndex !== null) {
// // // //       const selectedQuestion = chatList[selectedQuestionIndex];
// // // //       await sendAnswer(selectedQuestion.content, answerContent); // 선택된 질문에 대한 답변 전송
// // // //     }
// // // //   };

// // // //   const sendAnswer = async (questionContent: string, answer: string) => {
// // // //     const answerMessage: ChatMessage = {
// // // //       type: "answer",
// // // //       content: answer,
// // // //     };

// // // //     // 답변 메시지를 서버로 전송 (axios 사용)
// // // //     try {
// // // //       const response = await axios.post(serverURL, answerMessage);
// // // //       console.log("답변 전송 성공 : ", response.data);
// // // //       // 여기서 서버 응답에 대한 추가 처리를 할 수 있습니다.
// // // //     } catch (error) {
// // // //       console.error("답변 전송 오류:", error);
// // // //     }

// // // //     // 선택된 질문 초기화 및 입력 필드 초기화
// // // //     setAnswerContent("");
// // // //     setSelectedQuestionIndex(null);
// // // //   };

// // // //   const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
// // // //     setAnswerContent(event.target.value); // 입력 필드 내용 변경 시 상태 업데이트
// // // //   };

// // // //   // 채팅 목록을 매핑하여 각 질문과 답변을 표시하는 JSX
// // // //   const msgBox = chatList.map((item, idx) => {
// // // //     const isSelected = idx === selectedQuestionIndex; // 선택된 질문 여부
// // // //     return (
// // // //       <div
// // // //         key={idx}
// // // //         className={`chat-box ${item.type === "question" ? "question" : "answer"} ${isSelected ? "selected" : ""}`}
// // // //         role="button" // 클릭 가능한 요소로 설정
// // // //         onClick={() => handleClickQuestion(idx)} // 질문 클릭 시 처리
// // // //       >
// // // //         <span>{item.content}</span> {/* 질문 또는 답변 내용 표시 */}
// // // //       </div>
// // // //     );
// // // //   });

// // // //   const openChat = () => {
// // // //     setPersonMenu("chat");
// // // //   };

// // // //   return (
// // // //     <div className="video-container">
// // // //       <div className="personnel-container">
// // // //         <div>
// // // //           <p>Q&A</p>
// // // //           <button onClick={openChat}>Video</button>
// // // //         </div>
// // // //       </div>

// // // //       <div className="chat-box">{msgBox}</div>

// // // //       <form id="qna-submit-form" onSubmit={handleSubmitAnswer}>
// // // //         <div className="qna-input-container">
// // // //           <input
// // // //             type="text"
// // // //             id="answerContent" // 입력 필드 고유 식별자
// // // //             value={answerContent}
// // // //             placeholder="내용을 입력하세요"
// // // //             className="qna-input-field"
// // // //             onChange={handleChangeAnswer}
// // // //           />
// // // //           <button className="qna-submit-button" type="submit">
// // // //             전송
// // // //           </button>{" "}
// // // //         </div>
// // // //       </form>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default QandA;

// // // import React, { useContext, useEffect, useState } from "react";
// // // import { WebSocketContext } from "@/context/WebSocketConnect";
// // // import { useEditorMenuActions } from "@/store/EditorMenuStore";
// // // import axios from "axios";

// // // interface ChatMessage {
// // //   type: "question" | "answer";
// // //   content: string;
// // // }

// // // const QandA: React.FC = () => {
// // //   const { setPersonMenu } = useEditorMenuActions();
// // //   const [chatList, setChatList] = useState<ChatMessage[]>([]); // 채팅 목록 상태
// // //   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null); // 선택된 질문 인덱스 상태
// // //   const [answerContent, setAnswerContent] = useState<string>(""); // 답변 내용 상태

// // //   const serverURL = `${import.meta.env.VITE_APP_API_URL}/qna`; // 서버 URL 설정

// // //   const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

// // //   useEffect(() => {
// // //     const subscribeToQna = () => {
// // //       if (stompClient && stompClient.connected) {
// // //         // 웹소켓 연결 상태가 되면 채팅 구독
// // //         stompClient.subscribe("/sub/qna", (message: any) => {
// // //           const newMessage: ChatMessage = JSON.parse(message.body); // 새로운 메시지 파싱
// // //           setChatList((prev) => [...prev, newMessage]); // 채팅 목록에 추가
// // //         });
// // //       }
// // //     };

// // //     subscribeToQna();

// // //     return () => {
// // //       // Clean up function
// // //       if (stompClient && stompClient.connected) {
// // //         stompClient.disconnect();
// // //       }
// // //     };
// // //   }, [stompClient]); // stompClient가 변경될 때마다 구독을 새로 설정하고 해제

// // //   const handleClickQuestion = (index: number) => {
// // //     setSelectedQuestionIndex(index); // 클릭된 질문의 인덱스 저장
// // //   };

// // //   const handleSubmitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
// // //     event.preventDefault();
// // //     if (selectedQuestionIndex !== null) {
// // //       const selectedQuestion = chatList[selectedQuestionIndex];
// // //       await sendAnswer(selectedQuestion.content, answerContent); // 선택된 질문에 대한 답변 전송
// // //     }
// // //   };

// // //   const sendAnswer = async (questionContent: string, answer: string) => {
// // //     const answerMessage: ChatMessage = {
// // //       type: "answer",
// // //       content: answer,
// // //     };

// // //     // 답변 메시지를 서버로 전송 (axios 사용)
// // //     try {
// // //       const response = await axios.post(serverURL, answerMessage);
// // //       console.log("답변 전송 성공 : ", response.data);
// // //       // 여기서 서버 응답에 대한 추가 처리를 할 수 있습니다.
// // //     } catch (error) {
// // //       console.error("답변 전송 오류:", error);
// // //     }

// // //     // 선택된 질문 초기화 및 입력 필드 초기화
// // //     setAnswerContent("");
// // //     setSelectedQuestionIndex(null);
// // //   };

// // //   const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
// // //     setAnswerContent(event.target.value); // 입력 필드 내용 변경 시 상태 업데이트
// // //   };

// // //   // // 채팅 목록을 매핑하여 각 질문과 답변을 표시하는 JSX
// // //   // const msgBox = chatList.map((item, idx) => {
// // //   //   const isSelected = idx === selectedQuestionIndex; // 선택된 질문 여부
// // //   //   return (
// // //   //     <div
// // //   //       key={idx}
// // //   //       className={`chat-box ${item.type === "question" ? "question" : "answer"} ${isSelected ? "selected" : ""}`}
// // //   //       role="button" // 클릭 가능한 요소로 설정
// // //   //       onClick={() => handleClickQuestion(idx)} // 질문 클릭 시 처리
// // //   //     >
// // //   //       <span>{item.content}</span> {/* 질문 또는 답변 내용 표시 */}
// // //   //     </div>
// // //   //   );
// // //   // });

// // //   const msgBox = chatList.map((item, idx) => {
// // //     if (item.type === "question") {
// // //       return (
// // //         <div key={idx} className="qna-question-box">
// // //           <div className="qna-uestion-msg">
// // //             <span>{item.content}</span>
// // //           </div>
// // //         </div>
// // //       );
// // //     } else {
// // //       return (
// // //         <div key={idx} className="qna-answer-box">
// // //           <div className="qna-answer-msg">
// // //             <span>{item.content}</span>
// // //           </div>
// // //         </div>
// // //       );
// // //     }
// // //   });

// // //   const openChat = () => {
// // //     setPersonMenu("chat");
// // //   };

// // //   return (
// // //     <div className="video-container">
// // //       <div className="personnel-container">
// // //         <div>
// // //           <p>Q&A</p>
// // //           <button onClick={openChat}>Video</button>
// // //         </div>
// // //       </div>

// // //       <div className="chat-container">{msgBox}</div>

// // //       <form id="qna-submit-form" onSubmit={handleSubmitAnswer}>
// // //         <div className="qna-input-container">
// // //           <input
// // //             type="text"
// // //             id="qnaMsg" // 입력 필드 고유 식별자
// // //             value={answerContent}
// // //             placeholder="내용을 입력하세요"
// // //             className="qna-input-field"
// // //             onChange={handleChangeAnswer}
// // //             onKeyDown={(ev) => {
// // //               if (ev.keyCode === 13) {
// // //                 setAnswerContent("");
// // //               }
// // //             }}
// // //           />
// // //           <button className="qna-submit-button" type="submit">
// // //             전송
// // //           </button>{" "}
// // //         </div>
// // //       </form>
// // //     </div>
// // //   );
// // // };

// // // export default QandA;

// // import React, { useContext, useEffect, useState } from "react";
// // import { WebSocketContext } from "@/context/WebSocketConnect";
// // import { useEditorMenuActions } from "@/store/EditorMenuStore";
// // import axios from "axios";

// // interface ChatMessage {
// //   type: "question" | "answer";
// //   content: string;
// // }

// // const QandA: React.FC = () => {
// //   const { setPersonMenu } = useEditorMenuActions();
// //   const [chatList, setChatList] = useState<ChatMessage[]>([]); // 채팅 목록 상태
// //   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null); // 선택된 질문 인덱스 상태
// //   const [answerContent, setAnswerContent] = useState<string>(""); // 답변 내용 상태

// //   const serverURL = `${import.meta.env.VITE_APP_API_URL}/qna`; // 서버 URL 설정

// //   const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

// //   useEffect(() => {
// //     const subscribeToQna = () => {
// //       if (stompClient && stompClient.connected) {
// //         // 웹소켓 연결 상태가 되면 채팅 구독
// //         stompClient.subscribe("/sub/qna", (message: any) => {
// //           const newMessage: ChatMessage = JSON.parse(message.body); // 새로운 메시지 파싱
// //           setChatList((prev) => [...prev, newMessage]); // 채팅 목록에 추가
// //         });
// //       }
// //     };

// //     subscribeToQna();

// //     return () => {
// //       // Clean up function
// //       if (stompClient && stompClient.connected) {
// //         stompClient.disconnect();
// //       }
// //     };
// //   }, [stompClient]); // stompClient가 변경될 때마다 구독을 새로 설정하고 해제

// //   const handleClickQuestion = (index: number) => {
// //     setSelectedQuestionIndex(index); // 클릭된 질문의 인덱스 저장
// //   };

// //   const handleSubmitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
// //     event.preventDefault();
// //     if (selectedQuestionIndex !== null) {
// //       const selectedQuestion = chatList[selectedQuestionIndex];
// //       await sendAnswer(selectedQuestion.content, answerContent); // 선택된 질문에 대한 답변 전송
// //     }
// //   };

// //   const sendAnswer = async (questionContent: string, answer: string) => {
// //     const answerMessage: ChatMessage = {
// //       type: "answer",
// //       content: answer,
// //     };

// //     // 답변 메시지를 서버로 전송 (axios 사용)
// //     try {
// //       const response = await axios.post(serverURL, answerMessage);
// //       console.log("답변 전송 성공 : ", response.data);
// //       // 여기서 서버 응답에 대한 추가 처리를 할 수 있습니다.
// //     } catch (error) {
// //       console.error("답변 전송 오류:", error);
// //     }

// //     // 선택된 질문 초기화 및 입력 필드 초기화
// //     setAnswerContent("");
// //     setSelectedQuestionIndex(null);
// //   };

// //   const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
// //     setAnswerContent(event.target.value); // 입력 필드 내용 변경 시 상태 업데이트
// //   };

// //   const handleQuestionClick = (idx: number) => {
// //     handleClickQuestion(idx); // 질문 클릭 시 처리
// //   };

// //   const msgBox = chatList.map((item, idx) => {
// //     if (item.type === "question") {
// //       return (
// //         <div key={idx} className="qna-question-box" onClick={() => handleQuestionClick(idx)}>
// //           <div className="qna-question-msg">
// //             <span>{item.content}</span>
// //           </div>
// //         </div>
// //       );
// //     } else {
// //       return (
// //         <div key={idx} className="qna-answer-box">
// //           <div className="qna-answer-msg">
// //             <span>{item.content}</span>
// //           </div>
// //         </div>
// //       );
// //     }
// //   });

// //   const openChat = () => {
// //     setPersonMenu("chat");
// //   };

// //   return (
// //     <div className="video-container">
// //       <div className="personnel-container">
// //         <div>
// //           <p>Q&A</p>
// //           <button onClick={openChat}>Video</button>
// //         </div>
// //       </div>

// //       <div className="chat-container">{msgBox}</div>

// //       <form id="qna-submit-form" onSubmit={handleSubmitAnswer}>
// //         <div className="qna-input-container">
// //           <input
// //             type="text"
// //             id="qnaMsg" // 입력 필드 고유 식별자
// //             value={answerContent}
// //             placeholder="내용을 입력하세요"
// //             className="qna-input-field"
// //             onChange={handleChangeAnswer}
// //           />
// //           <button className="qna-submit-button" type="submit">
// //             전송
// //           </button>{" "}
// //         </div>
// //       </form>
// //     </div>
// //   );
// // };

// // export default QandA;

// import React, { useContext, useEffect, useState } from "react";
// import { WebSocketContext } from "@/context/WebSocketConnect";
// import { useEditorMenuActions } from "@/store/EditorMenuStore";
// import axios from "axios";

// interface ChatMessage {
//   type: "question" | "answer";
//   content: string;
// }

// const QandA: React.FC = () => {
//   const { setPersonMenu } = useEditorMenuActions();
//   const [chatList, setChatList] = useState<ChatMessage[]>([]); // 채팅 목록 상태
//   const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null); // 선택된 질문 인덱스 상태
//   const [answerContent, setAnswerContent] = useState<string>(""); // 답변 내용 상태

//   const serverURL = `${import.meta.env.VITE_APP_API_URL}/qna`; // 서버 URL 설정

//   const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

//   useEffect(() => {
//     const subscribeToQna = () => {
//       if (stompClient && stompClient.connected) {
//         // 웹소켓 연결 상태가 되면 채팅 구독
//         stompClient.subscribe("/sub/qna", (message: any) => {
//           const newMessage: ChatMessage = JSON.parse(message.body); // 새로운 메시지 파싱
//           setChatList((prev) => [...prev, newMessage]); // 채팅 목록에 추가
//         });
//       }
//     };

//     subscribeToQna();

//     // return () => {
//     //   // Clean up function
//     //   if (stompClient && stompClient.connected) {
//     //     stompClient.disconnect();
//     //   }
//     // };
//   }, [stompClient]); // stompClient가 변경될 때마다 구독을 새로 설정하고 해제

//   const handleClickQuestion = (index: number) => {
//     setSelectedQuestionIndex(index); // 클릭된 질문의 인덱스 저장
//   };

//   const handleSubmitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if (selectedQuestionIndex !== null) {
//       const selectedQuestion = chatList[selectedQuestionIndex];
//       if (selectedQuestion.type === "question") {
//         await sendQuestion(selectedQuestion.content); // 선택된 질문에 대한 서버로의 요청
//       } else {
//         await sendAnswer(selectedQuestion.content, answerContent); // 선택된 질문에 대한 답변 전송
//       }
//     }
//   };

//   const sendQuestion = async (questionContent: string) => {
//     const questionMessage: ChatMessage = {
//       type: "question",
//       content: questionContent,
//     };

//     // 질문 메시지를 서버로 전송 (axios 사용)
//     try {
//       const response = await axios.post(serverURL, questionMessage);
//       console.log("질문 전송 성공 : ", response.data);
//       // 여기서 서버 응답에 대한 추가 처리를 할 수 있습니다.
//     } catch (error) {
//       console.error("질문 전송 오류:", error);
//     }
//   };

//   const sendAnswer = async (questionContent: string, answer: string) => {
//     const answerMessage: ChatMessage = {
//       type: "answer",
//       content: answer,
//     };

//     // 답변 메시지를 서버로 전송 (axios 사용)
//     try {
//       const response = await axios.post(serverURL, answerMessage);
//       console.log("답변 전송 성공 : ", response.data);
//       // 여기서 서버 응답에 대한 추가 처리를 할 수 있습니다.
//     } catch (error) {
//       console.error("답변 전송 오류:", error);
//     }

//     // 선택된 질문 초기화 및 입력 필드 초기화
//     setAnswerContent("");
//     setSelectedQuestionIndex(null);
//   };

//   const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setAnswerContent(event.target.value); // 입력 필드 내용 변경 시 상태 업데이트
//   };

//   const handleQuestionClick = (idx: number) => {
//     handleClickQuestion(idx); // 질문 클릭 시 처리
//   };

//   const msgBox = chatList.map((item, idx) => {
//     if (item.type === "question") {
//       return (
//         <div key={idx} className="qna-question-box" onClick={() => handleQuestionClick(idx)}>
//           <div className="qna-question-msg">
//             <span>{item.content}</span>
//           </div>
//         </div>
//       );
//     } else {
//       return (
//         <div key={idx} className="qna-answer-box">
//           <div className="qna-answer-msg">
//             <span>{item.content}</span>
//           </div>
//         </div>
//       );
//     }
//   });

//   const openChat = () => {
//     setPersonMenu("chat");
//   };

//   return (
//     <div className="video-container">
//       <div className="personnel-container">
//         <div>
//           <p>Q&A</p>
//           <button onClick={openChat}>Video</button>
//         </div>
//       </div>

//       <div className="chat-container">{msgBox}</div>

//       <form id="qna-submit-form" onSubmit={handleSubmitAnswer}>
//         <div className="qna-input-container">
//           <input
//             type="text"
//             id="qnaMsg" // 입력 필드 고유 식별자
//             value={answerContent}
//             placeholder="내용을 입력하세요"
//             className="qna-input-field"
//             onChange={handleChangeAnswer}
//           />
//           <button className="qna-submit-button" type="submit">
//             전송
//           </button>{" "}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default QandA;

import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "@/context/WebSocketConnect";
import { useEditorMenuActions } from "@/store/EditorMenuStore";
import axios from "axios";

interface ChatMessage {
  type: "question" | "answer";
  content: string;
}

const QandA: React.FC = () => {
  const { setPersonMenu } = useEditorMenuActions();

  const [chatList, setChatList] = useState<ChatMessage[]>([]); // 채팅 목록 상태
  const [selectedQuestion, setSelectedQuestion] = useState<{
    index: number | null;
    content: string | null;
    type: "question" | "answer" | null;
  }>({
    index: null,
    content: null,
    type: null,
  }); // 선택된 질문 정보 상태
  const [answerContent, setAnswerContent] = useState<string>(""); // 답변 내용 상태

  const serverURL = `${import.meta.env.VITE_APP_API_URL}/rooms/qna`; // 서버 URL 설정

  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

  useEffect(() => {
    const subscribeToQna = () => {
      if (stompClient && stompClient.connected) {
        // 웹소켓 연결 상태가 되면 채팅 구독
        stompClient.subscribe("/sub/qna", (message: any) => {
          const newMessage: ChatMessage = JSON.parse(message.body); // 새로운 메시지 파싱
          setChatList((prev) => [...prev, newMessage]); // 채팅 목록에 추가
        });
      }
    };

    subscribeToQna();

    // return () => {
    //   // if (stompClient && stompClient.connected) {
    //   //   stompClient.unsubscribe("/sub/qna");
    //   // }
    // };
  }, [stompClient.connected]); // stompClient가 변경될 때마다 구독을 새로 설정하고 해제

  const handleClickQuestion = (index: number) => {
    setSelectedQuestion({
      index,
      content: chatList[index].content,
      type: chatList[index].type,
    }); // 클릭된 질문의 인덱스와 내용, 타입 저장
  };

  const handleSubmitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedQuestion.index !== null && selectedQuestion.type) {
      if (selectedQuestion.type === "question") {
        await sendQuestion(selectedQuestion.content!); // 선택된 질문에 대한 서버로의 요청
      } else {
        await sendAnswer(selectedQuestion.content!, answerContent); // 선택된 질문에 대한 답변 전송
      }
    }
  };

  const sendQuestion = async (questionContent: string) => {
    const questionMessage: ChatMessage = {
      type: "question",
      content: questionContent,
    };

    try {
      const response = await axios.post(serverURL, questionMessage);
      console.log("질문 전송 성공 : ", response.data);
    } catch (error) {
      console.error("질문 전송 오류 :", error);
    }
  };

  const sendAnswer = async (questionContent: string, answer: string) => {
    const answerMessage: ChatMessage = {
      type: "answer",
      content: answer,
    };

    try {
      const response = await axios.post(serverURL, answerMessage);
      console.log("답변 전송 성공 : ", response.data);
    } catch (error) {
      console.error("답변 전송 오류 :", error);
    }

    // 선택된 질문 초기화 및 입력 필드 초기화
    setAnswerContent("");
    setSelectedQuestion({
      index: null,
      content: null,
      type: null,
    });
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerContent(event.target.value); // 입력 필드 내용 변경 시 상태 업데이트
  };

  const handleQuestionClick = (idx: number) => {
    handleClickQuestion(idx); // 질문 클릭 시 처리
  };

  const msgBox = chatList.map((item, idx) => {
    if (item.type === "question") {
      return (
        <div key={idx} className="qna-question-box" onClick={() => handleQuestionClick(idx)}>
          <div className="qna-question-msg">
            <span>{item.content}</span>
          </div>
        </div>
      );
    } else {
      return (
        <div key={idx} className="qna-answer-box">
          <div className="qna-answer-msg">
            <span>{item.content}</span>
          </div>
        </div>
      );
    }
  });

  const openChat = () => {
    setPersonMenu("chat");
  };

  return (
    <div className="video-container">
      <div className="personnel-container">
        <div>
          <p>Q&A</p>
          <button onClick={openChat}>Video</button>
        </div>
      </div>

      <div className="chat-container">{msgBox}</div>

      <form id="qna-submit-form" onSubmit={handleSubmitAnswer}>
        <div className="qna-input-container">
          <input
            type="text"
            id="qnaMsg" // 입력 필드 고유 식별자
            value={answerContent}
            placeholder="내용을 입력하세요"
            className="qna-input-field"
            onChange={handleChangeAnswer}
          />
          <button className="qna-submit-button" type="submit">
            전송
          </button>{" "}
        </div>
      </form>
    </div>
  );
};

export default QandA;
