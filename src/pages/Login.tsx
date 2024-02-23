import React from "react";
import { useLoginFormStore } from "@/store/store";
import bg from "../assets/images/bg.png";

const Login: React.FC = () => {
  const { username, password, setUsername, setPassword } = useLoginFormStore();

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 추가
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
        <div className="logo-container">
          <img src={bg} alt="bg" />
        </div>
        {/* 로그인 Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="login-text-container">
            <p className="login-text">Login</p>
          </div>
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
  );
};

export default Login;

// import React from "react";
// import { useLoginFormStore } from "@/store/store";
// import bg from "../assets/images/bg.png";

// const Login: React.FC = () => {
//   const { username, password, setUsername, setPassword } = useLoginFormStore();

//   const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setUsername(e.target.value);
//   };

//   const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setPassword(e.target.value);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     // 로그인 로직 추가
//     console.log("Username:", username);
//     console.log("Password:", password);
//   };

//   const handleSignupClick = () => {
//     window.location.href = "/signup"; // 회원가입 페이지로 이동
//   };

//   return (
//     <div className="bg-container">
//       <div className="login-form-container">
//         {/* 로고 및 이미지 */}
//         <div className="logo-container">
//           <img src={bg} alt="sign_bg" />
//         </div>

//         {/* 로그인 Form */}
//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="login-text-container">
//             <p className="login-text">Login</p>
//           </div>
//           <input
//             type="text"
//             value={username}
//             onChange={handleUsernameChange}
//             placeholder="아이디"
//             className="input-field"
//           />
//           <input
//             type="password"
//             value={password}
//             onChange={handlePasswordChange}
//             placeholder="비밀번호"
//             className="input-field"
//           />
//           <button type="submit" className="submit-button">
//             Login
//           </button>
//           <p className="signup-text">
//             회원이 아니신가요?{" "}
//             <span onClick={handleSignupClick} className="signup-link">
//               회원가입
//             </span>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Login;
