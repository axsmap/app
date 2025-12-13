"use client";
import { useTranslation } from "react-i18next";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isDeleting: boolean;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isDeleting,
}) => {
  const { t } = useTranslation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {t("editAccountDeleteConfirmTitle")}
        </h2>
        <p className="text-gray-600 mb-6">
          {t("editAccountDeleteConfirmMessage")}
        </p>
        <div className="flex gap-4 justify-end">
          <button
            type="button"
            className="px-4 py-2 rounded-md border text-gray-700 hover:bg-gray-100 disabled:opacity-50"
            onClick={onClose}
            disabled={isDeleting}
          >
            {t("editAccountDeleteCancelButton")}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-md text-white font-medium disabled:opacity-50 flex items-center gap-2"
            onClick={onConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                {t("editAccountDeleteConfirmButton")}
              </>
            ) : (
              t("editAccountDeleteConfirmButton")
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
