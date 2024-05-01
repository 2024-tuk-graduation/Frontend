import React, { useState } from "react";
import bg from "../assets/images/bg.png";
import defaultProfile from "../assets/images/default_profile.svg";
import axios from "axios";

const SignUp: React.FC = () => {
  const [nickname, setNickname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState<File | null>(null); // 파일 상태 변경
  const [showDefaultProfile, setShowDefaultProfile] = useState<boolean>(false); // 기본 프로필 보여주는 상태
  const [inputKey, setInputKey] = useState(Date.now());

  const serverURL = `${import.meta.env.VITE_APP_API_URL}/member/signup`;

  const handleProfileImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile); // 파일 상태 업데이트
      setShowDefaultProfile(false); // 기본 프로필 보여주는 상태 업데이트
      console.log("file", file);
      console.log("handleProfileImageChange 함수 실행");
    }
  };

  const handleDefaultProfile = () => {
    setFile(null); // 파일 상태 업데이트
    // setFile(null)이 잘 작동 되는지 확인
    // console.log("file", file);
    setInputKey(Date.now());
    console.log("handleDefaultProfile 함수 실행");
    setShowDefaultProfile(true); // 기본 프로필 상태 업데이트
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 회원가입 요청 시에 JSON으로 전송할 객체 생성
      const UserObject = {
        nickname: nickname,
        username: username,
        password: password,
      };

      // FormData 객체 생성
      const formData = new FormData();

      // 이미지 파일 추가
      if (file) {
        formData.append("part", file, file.name);
        console.log("파일 전송");
      } else {
        console.log("기본 프로필 이미지 전송");
        console.log("file", file);
      }

      // 회원가입 요청에 필요한 JSON 데이터 추가
      const jsonStr = JSON.stringify(UserObject);
      formData.append("data", new Blob([jsonStr], { type: "application/json" }));

      // 서버에 요청 보내기
      const response = await axios.post(serverURL, formData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 전송 시에는 multipart/form-data로 설정
          accept: "application/json", // 수신 헤더에 accept 추가
        },
      });

      console.log("회원가입 성공:", response);
      // 회원가입 성공 후 작업
      // window.location.href = "/login";
    } catch (error) {
      console.error("회원가입 실패:", error);
      // 회원가입 실패 시 오류 처리
    }
  };

  return (
    <div className="bg-container">
      <div className="container">
        <div className="logo-container">
          <img src={bg} alt="bg" />
        </div>
        <form className="signup-form" onSubmit={handleSubmit}>
          <div className="signup-text-container">
            <p className="signup-text">Sign Up</p>
          </div>
          <div className="profile-container">
            <img
              src={showDefaultProfile ? defaultProfile : file ? URL.createObjectURL(file) : defaultProfile}
              alt="Profile"
              className="profile-image"
            />
            <div className="profile-button">
              <button className="default-button" type="button" onClick={handleDefaultProfile}>
                기본 프로필 선택
              </button>
              <label htmlFor="file">
                <div className="upload-button">프로필 등록하기</div>
              </label>
              {/* <input type="file" name="file" id="file" accept="image/*" onChange={handleProfileImageChange}></input> */}
              <input
                type="file"
                name="file"
                id="file"
                accept="image/*"
                key={inputKey}
                onChange={handleProfileImageChange}
              ></input>
            </div>
          </div>
          <input
            type="text"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            placeholder="닉네임"
            className="input-field"
          />
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
