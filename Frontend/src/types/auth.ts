export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}
