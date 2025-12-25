"use client";
import { Suspense, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useLoginWithGoogleMutation } from "@/Services/modules/auth";
import { useDispatch } from "react-redux";
import { getTokenSuccess } from "@/Store/Auth/tokenSlice";
import { getUserSuccess } from "@/Store/Auth/userSlice";
import Cookies from "js-cookie";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function GoogleCallback() {
  return (
    <Suspense
      fallback={
        <div className="flex flex-col items-center justify-center h-screen">
          <AiOutlineLoading3Quarters className="animate-spin text-4xl text-yellow-500" />
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      }
    >
      <GoogleCallbackContent />
    </Suspense>
  );
}

function GoogleCallbackContent() {
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
      } catch (error: any) {
        console.error("Error logging in with Google:", error);
        
        // Check if account is archived (403 response)
        if (error?.status === 403 && error?.data?.isArchived && error?.data?.userId) {
          // Redirect to reactivation page with userId
          router.push(`/reactivate-account?userId=${error.data.userId}`);
          return;
        }
        
        // Handle other errors
        router.push("/?error=google_login_failed");
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
