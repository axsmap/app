"use client";
import AppleIcon from "@/assets/icons/apple-icon";
import GoogleIcon from "@/assets/icons/google-icon";
import CustomInput from "@/components/custom-input/custom-input";
import Link from "next/link";
import React, { useState } from "react";
import { useLoginMutation } from "../Services/modules/auth";
import { useToast } from "@/components/context/toast-context";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { AuthModalScreenProps } from "@/utils/types";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import { validateLogin } from "@/components/AuthModal/handleAuthModal";

interface ApiError {
  data: {
    general: string;
  };
  status: number;
}

const Login: React.FC<AuthModalScreenProps> = ({ setPage, closeAuthModal }) => {
  const { showToast } = useToast();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(formData).unwrap();
      Cookies.set("token", response.token, { expires: 7 });
      Cookies.set("refreshToken", response.refreshToken, { expires: 7 });
      showToast("Login Sucessfully", "success");
      closeAuthModal();
    } catch (error) {
      const apiError = error as ApiError;
      const errorMessage =
        apiError?.data?.general || "An unexpected error occurred.";
      showToast(errorMessage, "error");
    }
  };

  return (
    <div className="w-full relative max-w-[700px] mx-auto bg-white rounded-2xl shadow-md mt-8 mb-8 sm:px-6 md:px-10 md:py-10 space-y-6">
      <div
        onClick={closeAuthModal}
        className="absolute h-10 w-10  right-6 top-6"
      >
        <CloseMenuIcon />
      </div>
      <h2 className="text-2xl font-semibold text-center">
        Login to Your Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <CustomInput
          name="email"
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <CustomInput
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
          }
        />

        <div className="flex justify-between items-center text-sm">
          <span>
            <input type="checkbox" id="rememberMe" className="mr-2" />
            Remember Me
          </span>
          <p
            // href="/forgot-password"
            className="text-blue-500 hover:underline"
            onClick={() => setPage("ForgotPassword")}
          >
            Forgot password
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition items-center flex justify-center gap-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <AiOutlineLoading3Quarters className="animate-spin" />
          ) : (
            "Login"
          )}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">Or login with</div>
      <div className="flex flex-col md:flex-row gap-4">
        <button
          onClick={() =>
            validateLogin(() => {
              alert("function has been called");
            })()
          }
          className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full"
        >
          <GoogleIcon />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full">
          <AppleIcon />
          Apple
        </button>
      </div>

      <div
        onClick={() => setPage("CreateAccount")}
        className="text-center text-md text-gray-700"
      >
        Don't have an account?{" "}
        <p className="text-blue-500 font-medium hover:underline">
          Create Account
        </p>
      </div>
    </div>
  );
};

export default Login;

// app/login/page.tsx
// "use client";
// import { useAuth } from "@/components/context/auth-context";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const router = useRouter();

//   const handleLogin = () => {
//     login({ name: "Hassan Jahangir", email: "hassan@example.com" });
//     router.push("/");
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <button
//         onClick={handleLogin}
//         className="bg-blue-600 text-white px-6 py-3 rounded-md"
//       >
//         Log In (Mock)
//       </button>
//     </div>
//   );
// }
