// import React from "react";
// import copy from "@/assets/images/copy.svg";
// import { useEntranceCodeState } from "@/store/editorRoomInfoStore";

// const EntranceCode = () => {
//   const handleCopyEntranceCode
//   const entranceCode = useEntranceCodeState();

//   return (
//     <div className="entranceCode-container ">
//       <p>입장코드</p>
//       <div className="entranceCode-copy-container ">
//         <h3>{entranceCode}</h3>
//         <img src={copy} alt="복사하기" onClick={handleCopyEntranceCode()}/>
//       </div>
//     </div>
//   );
// };

// export default EntranceCode;

import React from "react";
import copy from "@/assets/images/copy.svg";
import { useEntranceCodeState } from "@/store/editorRoomInfoStore";

const EntranceCode = () => {
  const entranceCode = useEntranceCodeState();

  const handleCopyEntranceCode = () => {
    navigator.clipboard
      .writeText(entranceCode)
      .then(() => {
        console.log("Entrance code copied:", entranceCode);
      })
      .catch((err) => {
        console.error("Failed to copy entrance code:", err);
      });
  };

  return (
    <div className="entranceCode-container">
      <p>입장코드</p>
      <div className="entranceCode-copy-container">
        <h3>{entranceCode}</h3>
        <img src={copy} alt="복사하기" onClick={handleCopyEntranceCode} />
      </div>
    </div>
  );
};

export default EntranceCode;
