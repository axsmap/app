"use-client";
import { AuthModalScreens } from "@/utils/types";
import { forwardRef, useCallback, useImperativeHandle, useState } from "react";
import CreateAccountForm from "../create-account-form/create-account-form";
import { AuthModalHandler } from "./handleAuthModal";
import LoginModal from "../LoginModal/LoginModal";
import ForgotPasswordModal from "../ForgotPasswordModal/ForgotPasswordModal";

const AuthModal = forwardRef<AuthModalHandler, {}>(({}, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const [displayPage, setDisplayPage] = useState<AuthModalScreens>("Login");

  const showModal = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setDisplayPage("Login");
  }, [isOpen]);

  useImperativeHandle(ref, () => ({ closeModal, showModal }), [
    closeModal,
    showModal,
  ]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="flex justify-between items-center w-full">
        {displayPage === "Login" && (
          <LoginModal setPage={setDisplayPage} closeAuthModal={closeModal} />
        )}
        {displayPage === "CreateAccount" && (
          <CreateAccountForm
            setPage={setDisplayPage}
            closeAuthModal={closeModal}
          />
        )}
        {displayPage === "ForgotPassword" && (
          <ForgotPasswordModal
            setPage={setDisplayPage}
            closeAuthModal={closeModal}
          />
        )}
      </div>
    </div>
  );
});

export default AuthModal;
