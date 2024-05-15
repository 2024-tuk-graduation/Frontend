import React from "react";

const RemoteVideoStatus = ({ img, remote }: { img: string; remote: string }) => {
  return (
    <div className="remote-video-statue">
      <img src={img} />
    </div>
  );
};

export default RemoteVideoStatus;
