import { baseAPI } from "../customApi";


export const editorRoomInfoApi = async (entranceCode:any) => {

  return await baseAPI.get(`/rooms/${entranceCode}` );
};
