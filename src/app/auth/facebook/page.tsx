"use client";
import React from "react";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { getTokenSuccess } from "@/Store/Auth/tokenSlice";
import { useLoginWithFacebookMutation } from "@/Services/modules/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Suspense } from "react";

export default function FacebookCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-yellow-500" />
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      }
    >
      <FacebookCallbackContent />
    </Suspense>
  );
}

function FacebookCallbackContent(): React.ReactElement {
  const searchParams = useSearchParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const [loginWithFacebook] = useLoginWithFacebookMutation();

  useEffect(() => {
    const handleFacebookLogin = async () => {
      const code = searchParams.get("code");
      if (!code) return;
      try {
        const data = await loginWithFacebook({
          code,
          web: "true",
          redirectUri: `${window.origin}/auth/facebook`,
        }).unwrap();
        if (data.token) {
          dispatch(getTokenSuccess(data.token));
          Cookies.set("token", data.token, { expires: 7 });
          router.push("/");
        } else {
          console.error("No token returned from Facebook login.");
        }
      } catch (error) {
        console.error("Error during Facebook login:", error);
      }
    };

    handleFacebookLogin();
  }, [searchParams, loginWithFacebook, dispatch, router]);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <AiOutlineLoading3Quarters className="animate-spin text-4xl text-yellow-500" />
      <p className="text-lg font-semibold">Logging you in with Facebook...</p>
    </div>
  );
}
