"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLoginWithGoogleMutation } from "@/Services/modules/auth";
import { useDispatch } from "react-redux";
import { getTokenSuccess } from "@/Store/Auth/tokenSlice";
import { getUserSuccess } from "@/Store/Auth/userSlice";
import Cookies from "js-cookie";

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
        console.log("Google login response:", data);
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

  return <p>Logging you in with Google...</p>;
}
