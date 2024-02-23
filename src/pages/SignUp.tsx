import React from "react";
import { useSignUpFormStore } from "@/store/store";
import bg from "../assets/images/bg.png";

const SignUp: React.FC = () => {
  const { profileImage, nickname, username, password, setNickname, setProfileImage, setUsername, setPassword } =
    useSignUpFormStore();

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage(e.target.value);
  };

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(e.target.value);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 회원가입 로직 추가
    console.log("Profile Image:", profileImage);
    console.log("Nickname:", nickname);
    console.log("Username:", username);
    console.log("Password:", password);
  };

  const handleSubmitClick = () => {
    window.location.href = "/login"; // 로그인 페이지로 이동
  };

  return (
    <div className="bg-container">
      <div className="container">
        {/* 로고 및 이미지 */}
        <div className="logo-container">
          <img src={bg} alt="bg" />
        </div>
        {/* 로그인 Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-text-container">
            <p className="signup-text">Sign Up</p>
          </div>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임"
            className="input-field"
          />
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="아이디"
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="비밀번호"
            className="input-field"
          />
          <button type="submit" className="submit-button" onClick={handleSubmitClick}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
