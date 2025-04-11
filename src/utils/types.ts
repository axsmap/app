export type AuthModalScreens = "Login" | "CreateAccount" | "ForgotPassword";

export interface AuthModalScreenProps {
  setPage: (e: AuthModalScreens) => void;
  closeAuthModal: () => void;
}
