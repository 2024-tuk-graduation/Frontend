import React, { useState } from "react";
import bg from "../assets/images/bg.png";
import { useCookies } from "react-cookie";
// import { useLoginFormStore } from "@/store/loginFormState";
import axios from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [, setCookie] = useCookies(["rememberId"]);

  const serverURL = `${import.meta.env.VITE_APP_API_URL}/member/login`;
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 필드가 비어있는지 확인
    if (!username || !password) {
      setErrorMessage("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        serverURL,
        {
          username: username,
          password: password,
        },
        { withCredentials: true }
      );
      const UserName = response.data.data.nickname;

      alert("로그인 성공");

      window.location.href = "/selectRoom";
      setCookie("rememberId", String(UserName), { path: "/" });
    } catch (error) {
      console.error("로그인 실패!!:", error);
      setErrorMessage("아이디 또는 비밀번호가 일치하지 않습니다.");
    }

    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleSignupClick = () => {
    window.location.href = "/signup"; // 회원가입 페이지로 이동
  };

  return (
    <div className="bg-container">
      <div className="container">
        {/* 로고 및 이미지 */}
        <div className="login-container">
          <div className="logo-container">
            <img src={bg} alt="sign_bg" />
          </div>
        </div>

        {/* 로그인 Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-text-container">
            <p className="login-text">Login</p>
          </div>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            className="login-input-field"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="login-input-field"
          />
          <p className="login-error-message">{errorMessage}</p>
          <button type="submit" className="login-submit-button">
            Login
          </button>
          <p className="signup-link-text">
            회원이 아니신가요?{""}
            <span onClick={handleSignupClick} className="signup-link">
              회원가입
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
