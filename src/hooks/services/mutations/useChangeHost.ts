import { baseAPI } from "../customApi";

export interface changeHostApiPropsType {
  entranceCode: string;
  currentHostNickname: string;
  newHostNickname: string;
}

export const changeHostApi = async (hostData: changeHostApiPropsType) => {
  const data = await baseAPI.post("/rooms/changeHost", hostData);
  return data;
};
