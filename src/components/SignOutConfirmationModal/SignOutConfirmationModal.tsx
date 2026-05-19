"use client";

import { X } from "lucide-react";
import { useTranslation } from "react-i18next";

interface SignOutConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const SignOutConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
}: SignOutConfirmationModalProps) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sign-out-confirmation-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h3
            id="sign-out-confirmation-title"
            className="text-lg font-semibold text-gray-900"
          >
            {t("signOutConfirmTitle")}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label={t("signOutConfirmCloseLabel")}
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">{t("signOutConfirmMessage")}</p>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-colors"
          >
            {t("signOutConfirmCancelButton")}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            {t("signOutConfirmConfirmButton")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutConfirmationModal;
