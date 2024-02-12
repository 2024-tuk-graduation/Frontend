import { create } from "zustand";

// 로그인 정보 상태
interface LoginFormState {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

const useLoginFormStore = create<LoginFormState>((set) => ({
  username: "",
  password: "",
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
}));

export default useLoginFormStore;
