import React, { useState } from "react";
import { useSignUpFormStore } from "@/store/store";
import bg from "../assets/images/bg.png";
import defaultProfile from "../assets/images/defaultProfile.svg";

const SignUp: React.FC = () => {
  const { nickname, username, password, setNickname, setUsername, setPassword } = useSignUpFormStore();
  const [profileImage, setProfileImage] = useState(defaultProfile);

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setProfileImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
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
        {/* 회원가입 Form */}
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-text-container">
            <p className="signup-text">Sign Up</p>
          </div>
          {/* 프로필 이미지 */}
          <div className="profile-container">
            <img src={profileImage || defaultProfile} alt="Profile" className="profile-image" />
            <div className="profile-button">
              <button className="default-button">기본 프로필 선택</button>
              <label htmlFor="file">
                <div className="upload-button">프로필 등록하기</div>
              </label>
              <input type="file" name="file" id="file" accept="image/*" onChange={handleProfileImageChange}></input>
            </div>
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
