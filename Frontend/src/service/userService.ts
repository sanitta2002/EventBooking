import { AxiosInstance } from "../axios/axios";
import { API_ROUTES } from "../constants/apiRoutes";
import type { User } from "../types/auth";

export const getAllUsers = async (): Promise<User[]> => {
  const response = await AxiosInstance.get<User[]>(API_ROUTES.USERS.BASE);
  return response.data;
};

