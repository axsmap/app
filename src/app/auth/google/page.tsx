"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLoginWithGoogleMutation } from "@/Services/modules/auth";
import { useDispatch } from "react-redux";
import { getTokenSuccess } from "@/Store/Auth/tokenSlice";
import { getUserSuccess } from "@/Store/Auth/userSlice";
import Cookies from "js-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginWithGoogle] = useLoginWithGoogleMutation();

  useEffect(() => {
    const handleGoogleLogin = async () => {
      const code = searchParams.get("code");
      if (!code) return;
      try {
        const data = await loginWithGoogle({ code }).unwrap();
        dispatch(getTokenSuccess(data.token));
        Cookies.set("token", data.token, { expires: 7 });
        dispatch(getUserSuccess(data.user));
        router.push("/");
      } catch (error) {
        console.error("Error logging in with Google:", error);
      }
    };
    handleGoogleLogin();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-yellow-500" />
      <p className="text-lg font-semibold">Logging you in with Google...</p>
    </div>
  );
}
