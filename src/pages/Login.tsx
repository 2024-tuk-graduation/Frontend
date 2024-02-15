import React from "react";
import useLoginFormStore from "@/store/store";
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
    // �α��� ����
    console.log("Username:", username);
    console.log("Password:", password);
  };

  return (
    <div className="bg-container">
      <div className="login-form-container">
        {/* �ΰ� �� ���? */}
        <img className="logo-form" src={sign_bg} alt="sign_bg" />
        {/* �α��� Form */}
        <form className="login-form" onSubmit={handleSubmit}>
          <p className="login-text">Login</p>
          <input
            type="text"
            value={username}
            onChange={handleUsernameChange}
            placeholder="�α���"
            className="input-field"
          />
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="��й��?"
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
