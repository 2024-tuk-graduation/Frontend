import React, { useContext, useEffect, useState } from "react";
import { WebSocketContext } from "@/context/WebSocketConnect";
import { useEditorMenuActions } from "@/store/EditorMenuStore";
import axios from "axios";

interface ChatMessage {
  id: string;
  type: "question" | "answer";
  content: string;
  parentId?: string;
}

const QandA: React.FC = () => {
  const { setPersonMenu } = useEditorMenuActions();

  const [chatList, setChatList] = useState<ChatMessage[]>(() => {
    const savedChatList = sessionStorage.getItem("chatList");
    return savedChatList ? JSON.parse(savedChatList) : [];
  });

  const [selectedQuestion, setSelectedQuestion] = useState<{
    id: string | null;
    content: string | null;
    type: "question" | "answer" | null;
  }>({
    id: null,
    content: null,
    type: null,
  });

  const [answerContent, setAnswerContent] = useState<string>("");
  const [newQuestionContent, setNewQuestionContent] = useState<string>("");
  const [clickedQuestionIndex, setClickedQuestionIndex] = useState<number | null>(null);

  const serverURL = `${import.meta.env.VITE_APP_API_URL}/rooms/qna`;

  const stompClient = useContext(WebSocketContext);

  useEffect(() => {
    const subscribeToQnA = () => {
      if (stompClient && stompClient.connected) {
        const subscription = stompClient.subscribe(
          `/sub/qna`,
          (res: { body: string }) => {
            try {
              const newMessage: ChatMessage = JSON.parse(res.body);
              console.log("Received message:", newMessage);

              setChatList((prevChatList) => {
                const messageExists = prevChatList.some(
                  (msg) => msg.content === newMessage.content && msg.type === newMessage.type
                );
                if (!messageExists) {
                  const updatedChatList = [...prevChatList, newMessage];
                  sessionStorage.setItem("chatList", JSON.stringify(updatedChatList)); // 상태 저장
                  return updatedChatList;
                }
                return prevChatList;
              });
            } catch (error) {
              console.error("Invalid JSON received:", res.body);
            }
          },
          (error: any) => {
            console.error("구독 오류 발생", error);
          }
        );

        return () => {
          if (subscription) subscription.unsubscribe();
        };
      }
    };

    subscribeToQnA();
  }, [stompClient]);

  const handleClickQuestion = (id: number) => {
    setSelectedQuestion({
      id: chatList[id].id,
      content: chatList[id].content,
      type: chatList[id].type,
    });
    setClickedQuestionIndex(id === clickedQuestionIndex ? null : id);
  };

  const handleSubmitAnswer = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedQuestion.id !== null && selectedQuestion.type === "question") {
      await sendAnswer(selectedQuestion.content!, answerContent);
    } else {
      await sendQuestion(newQuestionContent);
    }
  };

  const sendQuestion = async (questionContent: string) => {
    const questionMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "question",
      content: questionContent,
    };

    try {
      const response = await axios.post(serverURL, questionMessage);
      console.log("질문 전송 성공 : ", response.data);
      setNewQuestionContent("");
    } catch (error) {
      console.error("질문 전송 오류 :", error);
    }
  };

  const sendAnswer = async (questionContent: string, answer: string) => {
    const answerMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "answer",
      content: answer,
      parentId: selectedQuestion.id!,
    };

    try {
      const response = await axios.post(serverURL, answerMessage);
      console.log("답변 전송 성공 : ", response.data);

      setAnswerContent("");
      setSelectedQuestion({
        id: null,
        content: null,
        type: null,
      });
      setClickedQuestionIndex(null);
    } catch (error) {
      console.error("답변 전송 오류 :", error);
    }
  };

  const handleChangeAnswer = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswerContent(event.target.value);
  };

  const handleChangeQuestion = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewQuestionContent(event.target.value);
  };

  const handleQuestionClick = (idx: number) => {
    handleClickQuestion(idx);
  };

  const msgBox = chatList.map((item, idx) => {
    const questionBoxClass = idx === clickedQuestionIndex ? "qna-question-box clicked" : "qna-question-box";

    if (item.type === "question") {
      const associatedAnswers = chatList.filter((msg) => msg.parentId === item.id);
      return (
        <div key={item.id}>
          <div className={questionBoxClass} onClick={() => handleQuestionClick(idx)}>
            <div className="qna-question-msg">
              <span>{item.content}</span>
            </div>
          </div>
          {associatedAnswers.map((answer) => (
            <div key={answer.id} className="qna-answer-box">
              <div className="qna-answer-msg">
                <span>{answer.content}</span>
              </div>
            </div>
          ))}
        </div>
      );
    }
    return null;
  });

  const openChat = () => {
    setPersonMenu("compile");
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
          {selectedQuestion.id !== null && selectedQuestion.type === "question" ? (
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
