import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL;
const API_URL = `${API_BASE_URL}/auth`;

const api = axios.create({
  baseURL: API_URL,
});

export interface RegisterData {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  message: string;
  user?: {
    username: string;
    email: string;
    role: string;
  };
}

export const registerUser = async (
  data: RegisterData
): Promise<RegisterResponse> => {
  try {
    const response = await api.post<RegisterResponse>('/register', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Registration failed");
    }
    throw new Error("Unexpected error occurred");
  }
};

export interface LoginData {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
}

export const loginUser = async (
  data: LoginData
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || "Login failed");
    }
    throw new Error("Unexpected error occurred");
  }
};
