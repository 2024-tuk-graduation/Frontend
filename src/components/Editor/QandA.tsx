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
  const [newQuestionContent, setNewQuestionContent] = useState<string>(""); // 새로운 질문 내용 상태
  const [clickedQuestionIndex, setClickedQuestionIndex] = useState<number | null>(null); // 클릭된 질문 인덱스 상태

  const serverURL = `${import.meta.env.VITE_APP_API_URL}/rooms/qna`; // 서버 URL 설정

  const stompClient = useContext(WebSocketContext); // 웹소켓에 접근

  useEffect(() => {
    if (stompClient.connected) {
      stompClient.subscribe(
        `/sub/qna`,
        (res: { body: string }) => {
          try {
            const newMessage: ChatMessage = JSON.parse(res.body);

            // 질문이 추가되었음을 알림
            if (newMessage.type === "question") alert(`새로운 질문 : ${newMessage.content}`);

            // 이미 존재하는 메시지인지 체크 후 추가
            const messageExists = chatList.some(
              (msg) => msg.content === newMessage.content && msg.type === newMessage.type
            );
            if (!messageExists) {
              setChatList((prev) => [...prev, newMessage]);
            }
          } catch (error) {
            console.error("Invalid JSON received:", res.body);
          }
        },
        (error: any) => {
          console.error("구독 오류 발생", error);
        }
      );
    }
  }, [stompClient.connected]);

  const handleClickQuestion = (index: number) => {
    setSelectedQuestion({
      index,
      content: chatList[index].content,
      type: chatList[index].type,
    }); // 클릭된 질문의 인덱스와 내용, 타입 저장
    setClickedQuestionIndex(index === clickedQuestionIndex ? null : index); // 클릭된 질문 인덱스 상태 업데이트
  };

  const handleSubmitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedQuestion.index !== null && selectedQuestion.type === "question") {
      await sendAnswer(selectedQuestion.content!, answerContent); // 선택된 질문에 대한 답변 전송
    } else {
      await sendQuestion(newQuestionContent); // 새로운 질문 전송
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
      setNewQuestionContent(""); // 새로운 질문 전송 후 입력 필드 초기화
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

      // 선택된 질문 초기화 및 입력 필드 초기화
      setAnswerContent("");
      setSelectedQuestion({
        index: null,
        content: null,
        type: null,
      });

      // 클릭된 질문 인덱스 상태 초기화
      setClickedQuestionIndex(null);
    } catch (error) {
      console.error("답변 전송 오류 :", error);
    }
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerContent(event.target.value); // 입력 필드 내용 변경 시 상태 업데이트
  };

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestionContent(event.target.value); // 새로운 질문 입력 필드 내용 변경 시 상태 업데이트
  };

  const handleQuestionClick = (idx: number) => {
    handleClickQuestion(idx); // 질문 클릭 시 처리
  };

  const msgBox = chatList.map((item, idx) => {
    const questionBoxClass = idx === clickedQuestionIndex ? "qna-question-box clicked" : "qna-question-box";
    if (item.type === "question") {
      return (
        <div key={idx} className={questionBoxClass} onClick={() => handleQuestionClick(idx)}>
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
          {selectedQuestion.index !== null && selectedQuestion.type === "question" ? (
            <input
              type="text"
              id="qnaAnswer"
              value={answerContent}
              placeholder="답변을 입력하세요"
              className="qna-input-field"
              onChange={handleChangeAnswer}
            />
          ) : (
            <input
              type="text"
              id="qnaMsg"
              value={newQuestionContent}
              placeholder="질문을 입력하세요"
              className="qna-input-field"
              onChange={handleChangeQuestion}
            />
          )}
          <button className="qna-submit-button" type="submit">
            전송
          </button>
        </div>
      </form>
    </div>
  );
};

export default QandA;
