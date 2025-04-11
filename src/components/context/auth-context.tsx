"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useState, ReactNode } from "react";
import AuthModal from "../AuthModal/AuthModal";
import { AuthModalRef } from "../AuthModal/handleAuthModal";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  disability: string;
  race: string;
  description: string;
  avatar: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  const login = (userData: User) => setUser(userData);
  const logout = () => {
    setUser(null);
    router.push("/");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
      <AuthModal ref={AuthModalRef} />
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
