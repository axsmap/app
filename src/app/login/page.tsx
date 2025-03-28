"use client";
import AppleIcon from "@/assets/icons/apple-icon";
import GoogleIcon from "@/assets/icons/google-icon";
import CustomInput from "@/components/custom-input/custom-input";
import Link from "next/link";
import React, { useState } from "react";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-[600px] mx-auto bg-white rounded-xl shadow-md p-10 space-y-6">
      <h2 className="text-2xl font-semibold text-center">
        Login to Your Account
      </h2>

      <div className="space-y-4">
        <div>
          <CustomInput
            name="email"
            label="Email"
            placeholder=" Enter your email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>

        <div>
          <CustomInput
            name="password"
            label="Password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>

        <div className="flex justify-between items-center text-sm">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              onChange={() => setShowPassword(!showPassword)}
              className="accent-yellow-400"
            />
            Show Password
          </label>
          <a href="#" className="text-blue-500 hover:underline">
            Forgot password
          </a>
        </div>
      </div>

      <button className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition">
        Login
      </button>

      <div className="text-center text-sm text-gray-500">Or login with</div>
      <div className="flex gap-4">
        <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full">
          <GoogleIcon />
          Google
        </button>
        <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full">
          <AppleIcon />
          Apple
        </button>
      </div>

      <p className="text-center text-md text-gray-700">
        Already have an account?{" "}
        <Link
          href="/create-account"
          className="text-blue-500 font-medium hover:underline"
        >
          Create Account
        </Link>
      </p>
    </div>
  );
};
export default Login;
