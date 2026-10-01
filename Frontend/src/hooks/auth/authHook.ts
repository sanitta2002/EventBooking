import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginService, registerService } from "../../service/authService";
import { setAuth } from "../../store/authSlice";
import type { LoginFormData } from "../../components/Auth/LoginForm";
import type { RegisterFormData } from "../../components/Auth/RegisterForm";
import { FRONT_ROUTES } from "../../constants/frontRoutes";
import type { ApiError } from "../../types/auth";

export const useAuthHook = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (data: LoginFormData) => {
    try {
      setIsLoading(true);
      const res = await loginService(data);
      dispatch(
        setAuth({
          user: res.user,
          accessToken: res.accessToken,
          refreshToken: res.refreshToken,
        })
      );
      toast.success("Login successful!");
      navigate(FRONT_ROUTES.DASHBOARD);
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    try {
      setIsLoading(true);
      await registerService({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      toast.success("Registration successful! Please login.");
      navigate(FRONT_ROUTES.AUTH.LOGIN);
    } catch (err: unknown) {
      const error = err as ApiError;
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return { handleLogin, handleRegister, isLoading };
};
