import React from "react";

interface ProfileImgPropsType {
  img: string;
  name: string;
  editor?: boolean;
}
const ProfileImg = ({ img, name, editor }: ProfileImgPropsType) => {
  return (
    <div className={`person-profile-container ${editor ? "editor" : ""}`}>
      <img src={img} alt="프로필 사진" />
      <p>{name}</p>
    </div>
  );
};

export default ProfileImg;
