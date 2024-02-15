import React from "react";
import useLoginFormStore from "@/store/store";
import "../assets/scss/base/_common.scss";
import "../assets/scss/pages/_login.scss";
import sign_bg from "../assets/images/sign_bg.png";

const LoginForm: React.FC = () => {
  const { username, password, setUsername, setPassword } = useLoginFormStore();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="bg-container">
      <div className="login-form-container">
        {/* 로고 및 배경 */}
        <img className="logo-form" src={sign_bg} alt="sign_bg" />
        {/* 로그인 Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="login-text">Login</p>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="로그인"
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            className="input-field"
          />
          <button type="submit" className="submit-button">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
