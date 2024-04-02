import React, { useState } from "react";
import bg from "../assets/images/bg.png";
// import { useLoginFormStore } from "@/store/loginFormState";
import axios from "axios";

const Login: React.FC = () => {
  // const { username, password, setUsername, setPassword } = useLoginFormStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const baseURL = "http://localhost:8080/api/v1/member/login";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(baseURL, {
        username: username,
        password: password,
      });
      console.log("로그인 성공!!:", response);
      window.location.href = "/selectRoom"; // 로그인 성공 시 방 선택 페이지로 이동
    } catch (error) {
      console.error("로그인 실패!!:", error);
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
              className="input-field"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
              className="input-field"
            />
            <button type="submit" className="submit-button">
              Login
            </button>
            <p className="signup-text">
              회원이 아니신가요?{""}
              <span onClick={handleSignupClick} className="signup-link">
                회원가입
              </span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
