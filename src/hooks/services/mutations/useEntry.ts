import { baseAPI } from "../customApi";

export interface entryApiPropsType {
  entranceCode: string;
}

export const entryApi = async (code: entryApiPropsType) => {
  const data = await  baseAPI.post("/rooms/entrance",code);
  return data;
};
