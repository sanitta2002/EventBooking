import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { AuthResponse, User } from "../types/auth";
import type { LoginFormData } from "../components/Auth/LoginForm";
import type { RegisterFormData } from "../components/Auth/RegisterForm";

export const loginService = async (data: LoginFormData): Promise<AuthResponse> => {
  const response = await AxiosInstance.post<AuthResponse>(API_ROUTES.AUTH.LOGIN, data);
  return response.data;
};

export const registerService = async (data: Omit<RegisterFormData, "confirmPassword">): Promise<{ user: User }> => {
  const response = await AxiosInstance.post<{ user: User }>(API_ROUTES.AUTH.REGISTER, data);
  return response.data;
};
