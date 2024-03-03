import { create } from "zustand";

export interface LoginFormState {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

export interface SignUpFormState {
  profileImage: string;
  nickname: string;
  username: string;
  password: string;
  setProfileImage: (profileImage: string) => void;
  setNickname: (nickname: string) => void;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

export const useLoginFormStore = create<LoginFormState>((set) => ({
  username: "",
  password: "",
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
}));

export const useSignUpFormStore = create<SignUpFormState>((set) => ({
  profileImage: "",
  nickname: "",
  username: "",
  password: "",
  setProfileImage: (profileImage) => set({ profileImage }),
  setNickname: (nickname) => set({ nickname }),
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
}));
