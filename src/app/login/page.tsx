// "use client";
// import AppleIcon from "@/assets/icons/apple-icon";
// import GoogleIcon from "@/assets/icons/google-icon";
// import CustomInput from "@/components/custom-input/custom-input";
// import Link from "next/link";
// import React, { useState } from "react";

// const Login = () => {
//   const [formData, setFormData] = useState({
//     email: "",
//     password: "",
//   });

//   return (
//     <div className="w-full max-w-[700px] mx-auto bg-white rounded-2xl shadow-md mt-8 mb-8 sm:px-6 md:px-10 md:py-10 space-y-6">
//       <h2 className="text-2xl font-semibold text-center">
//         Login to Your Account
//       </h2>

//       <div className="space-y-4">
//         <CustomInput
//           name="email"
//           label="Email"
//           type="email"
//           placeholder="Enter your email"
//           value={formData.email}
//           onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//         />

//         <CustomInput
//           type="password"
//           name="password"
//           label="Password"
//           placeholder="Enter your password"
//           value={formData.password}
//           onChange={(e) =>
//             setFormData({ ...formData, password: e.target.value })
//           }
//         />

//         <div className="flex justify-between items-center text-sm">
//           <span></span>
//           <a href="#" className="text-blue-500 hover:underline">
//             Forgot password
//           </a>
//         </div>
//       </div>

//       <button className="w-full bg-[#FDDF00] text-black font-medium py-2 rounded-md hover:bg-yellow-300 transition">
//         Login
//       </button>

//       <div className="text-center text-sm text-gray-500">Or login with</div>
//       <div className="flex flex-col md:flex-row gap-4">
//         <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full">
//           <GoogleIcon />
//           Google
//         </button>
//         <button className="flex items-center justify-center gap-2 border border-gray-300 rounded-md py-2 w-full">
//           <AppleIcon />
//           Apple
//         </button>
//       </div>

//       <p className="text-center text-md text-gray-700">
//         Don't have an account?{" "}
//         <Link
//           href="/create-account"
//           className="text-blue-500 font-medium hover:underline"
//         >
//           Create Account
//         </Link>
//       </p>
//     </div>
//   );
// };

// export default Login;

// app/login/page.tsx
"use client";
import { useAuth } from "@/components/context/auth-context";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = () => {
    login({ name: "Hassan Jahangir", email: "hassan@example.com" });
    router.push("/");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-6 py-3 rounded-md"
      >
        Log In (Mock)
      </button>
    </div>
  );
}
