import { baseAPI } from "../customApi";

export interface entryApiPropsType {
  entranceCode: string;
  nickname: string;
}

export const entryApi = async (code: entryApiPropsType) => {
  const data = baseAPI.post("/api/v1/rooms/entrance", code);
  return data;
};
