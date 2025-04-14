import { store } from "@/Store";
import { createRef } from "react";

export const AuthModalRef = createRef<AuthModalHandler>();

export interface AuthModalHandler {
  showModal: () => void;
  closeModal: () => void;
}

export const showAuthModal = () => {
  AuthModalRef.current && AuthModalRef.current.showModal();
};

export const closeAuthModal = () => {
  AuthModalRef.current && AuthModalRef.current.closeModal();
};

type functionToBeCalled = (...args: any[]) => void;

export function validateLogin(
  functionToBeCalled: functionToBeCalled
): (...args: any[]) => void {
  const token = store.getState().token.token;
  if (token) {
    return function (...args: any[]) {
      functionToBeCalled(...args);
    };
  } else {
    return function () {
      showAuthModal();
    };
  }
}
