import { useState } from "react";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";
import { useAuthHook } from "../../hooks/auth/authHook";
import { FRONT_ROUTES } from "../../constants/frontRoutes";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { handleLogin, isLoading } = useAuthHook();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 relative overflow-hidden p-4 font-sans text-black">
      {/* Subtle Premium Background Elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute left-1/4 top-1/4 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-black/10 blur-[150px]" />
        <div className="absolute right-1/4 bottom-1/4 h-[600px] w-[600px] translate-x-1/2 translate-y-1/2 rounded-full bg-black/10 blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-8 sm:p-10 shadow-2xl shadow-gray-200 space-y-8">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gray-50 mb-2 border border-gray-200">
              <Lock className="w-6 h-6 text-gray-500" />
            </div>
            <h1 className="text-3xl font-bold tracking-tight text-black">Welcome Back</h1>
            <p className="text-sm text-gray-500">Sign in to your account to continue</p>
          </div>

          <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
            <div className="space-y-5">
              <div className="space-y-2">
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                  <Input
                    {...register("email")}
                    type="email"
                    placeholder="name@example.com"
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-gray-500" />
                  <Input
                    {...register("password")}
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-gray-500 hover:text-black transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">{errors.password.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="rounded border-gray-200 bg-white text-gray-500 focus:ring-[#6b7280]" />
                <span className="text-black/70">Remember me</span>
              </label>
              <Link to="/forgot-password" className="text-gray-500 hover:text-[#96928a] transition-colors font-medium">
                Forgot password?
              </Link>
            </div>

            <Button type="submit" className="w-full h-12 text-base" isLoading={isLoading}>
              Sign In
            </Button>
          </form>

          <div className="text-center text-sm text-black/70">
            Don't have an account?{" "}
            <Link to={FRONT_ROUTES.AUTH.REGISTER} className="text-gray-500 hover:text-[#96928a] font-medium transition-colors border-b border-gray-200 pb-0.5">
              Create one
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
