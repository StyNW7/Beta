import { create } from "zustand";
import { loginUser, type LoginData, type LoginResponse } from "../services/authService";

interface UserStore {
  token: string | null;
  isAuthenticated: boolean;
  login: (data: LoginData) => Promise<void>;
  logout: () => void;
  setToken: (token: string) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: async (data: LoginData) => {
    try {
      const response: LoginResponse = await loginUser(data);
      localStorage.setItem("token", response.token);
      set({
        token: response.token,
        isAuthenticated: true,
      });
    } catch (error) {
      set({
        token: null,
        isAuthenticated: false,
      });
      throw error; // propagate error to the UI
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({
      token: null,
      isAuthenticated: false,
    });
  },

  setToken: (token: string) => {
    localStorage.setItem("token", token);
    set({
      token,
      isAuthenticated: true,
    });
  },
}));
