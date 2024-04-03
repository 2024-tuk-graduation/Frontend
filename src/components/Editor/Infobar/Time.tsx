import React from "react";
import timeImg from "@/assets/images/time.svg";
const Time = () => {
  return (
    <div className="time-container">
      <img src={timeImg} alt="경과시간" />
      <h3>01 : 24 : 25</h3>
    </div>
  );
};

export default Time;
