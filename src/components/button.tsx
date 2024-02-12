import React from "react";
import "assets/scss/components/_buttons.scss";

interface ButtonProps {
  onClick: () => void;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button className="sign-button" onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
