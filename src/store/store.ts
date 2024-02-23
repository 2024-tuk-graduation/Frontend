import { create } from "zustand";

export interface LoginFormState {
  username: string;
  password: string;
  setUsername: (username: string) => void;
  setPassword: (password: string) => void;
}

export const useLoginFormStore = create<LoginFormState>((set) => ({
  username: "",
  password: "",
  setUsername: (username) => set({ username }),
  setPassword: (password) => set({ password }),
}));
