import { baseAPI } from "../customApi";


export const createRoomApi = async (roomData : any) => {

  const data = await  baseAPI.post("/rooms", roomData, {
        headers: {
          "Content-Type": "multipart/form-data", // 파일 전송 시에는 multipart/form-data로 설정
          accept: "application/json", 
        },
    
      } );
  return data;
}; 
