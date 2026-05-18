"use client";

import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { useDispatch } from "react-redux";

import { clearToken } from "@/Store/Auth/tokenSlice";
import { clearUser } from "@/Store/Auth/userSlice";

/**
 * Shared sign-out handler. Clears auth cookies, resets Redux auth state,
 * and routes the user back to the home page. Used by both the header
 * dropdown and the my-account page so the logout flow stays in one place.
 */
export function useSignOut() {
  const router = useRouter();
  const dispatch = useDispatch();

  return useCallback(() => {
    Cookies.remove("token");
    Cookies.remove("refreshToken");
    dispatch(clearToken());
    dispatch(clearUser());
    router.push("/");
  }, [router, dispatch]);
}
