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
      
      // Get rememberMe preference from sessionStorage
      const rememberMe = sessionStorage.getItem("rememberMe") === "true";
      // Clear it after reading
      sessionStorage.removeItem("rememberMe");
      
      try {
        const data = await loginWithFacebook({
          code,
          web: "true",
          redirectUri: `${window.origin}/auth/facebook`,
          rememberMe,
        }).unwrap();
        if (data.token) {
          dispatch(getTokenSuccess(data.token));
          // Set cookie expiration based on rememberMe: 90 days if true, 7 days if false
          const cookieExpiration = rememberMe ? 90 : 7;
          Cookies.set("token", data.token, { expires: cookieExpiration });
          if (data.refreshToken) {
            Cookies.set("refreshToken", data.refreshToken, { expires: cookieExpiration });
          }
          router.push("/");
        } else {
          console.error("No token returned from Facebook login.");
          router.push("/?error=facebook_login_failed");
        }
      } catch (error: any) {
        console.error("Error during Facebook login:", error);
        
        // Check if account is archived (403 response)
        if (error?.status === 403 && error?.data?.isArchived && error?.data?.userId) {
          // Redirect to reactivation page with userId
          router.push(`/reactivate-account?userId=${error.data.userId}`);
          return;
        }
        
        // Handle other errors
        router.push("/?error=facebook_login_failed");
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
