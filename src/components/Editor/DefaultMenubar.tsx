import React from "react";

const DefaultMenubar = ({ title }: { title: string }) => {
  return (
    <div className="default-menubar-container">
      <p>{title}</p>
    </div>
  );
};

export default DefaultMenubar;
