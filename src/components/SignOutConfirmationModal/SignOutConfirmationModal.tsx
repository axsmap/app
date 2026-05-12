"use client";

import { X } from "lucide-react";

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
            Sign Out
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
            aria-label="Close sign out confirmation"
          >
            <X size={20} />
          </button>
        </div>

        <p className="text-gray-600 mb-6">
          Are you sure you want to sign out?
        </p>

        <div className="flex gap-3 justify-end">
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-black rounded-lg transition-colors"
          >
            Yes
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOutConfirmationModal;
