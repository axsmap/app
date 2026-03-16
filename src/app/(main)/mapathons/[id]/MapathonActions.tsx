"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/Store";
import { useTranslation } from "react-i18next";
import {
  usePublishMapathonMutation,
  useDeleteMapathonMutation,
  useEventDetailsQuery,
} from "@/Services/modules/mapathon";
import { showToast } from "@/components/toast";
import { Trash2, Send, AlertTriangle } from "lucide-react";

interface MapathonActionsProps {
  mapathonId: string;
  initialStatus?: string;
  initialParticipantsCount: number;
  managersIds: string[];
}

export default function MapathonActions({
  mapathonId,
  initialStatus,
  initialParticipantsCount,
  managersIds,
}: MapathonActionsProps) {
  const { t } = useTranslation();
  const router = useRouter();
  const userId = useAppSelector((state) => state.user.user?.id);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const [publishMapathon, { isLoading: isPublishing }] =
    usePublishMapathonMutation();
  const [deleteMapathon, { isLoading: isDeleting }] =
    useDeleteMapathonMutation();

  // Poll for real-time updates
  const { data: liveData } = useEventDetailsQuery(mapathonId, {
    pollingInterval: 30000,
  });

  const status = liveData?.status || initialStatus || "active";
  const participantsCount =
    liveData?.participants?.length ?? initialParticipantsCount;
  const isCreator = userId && managersIds.includes(userId);
  const isDraft = status === "draft";
  const canDelete = isCreator && (isDraft || participantsCount === 0);
  const canPublish = isCreator && isDraft;

  // Don't render anything if user is not the creator
  if (!isCreator) return null;

  const handlePublish = async () => {
    try {
      await publishMapathon(mapathonId).unwrap();
      showToast({
        message: t("mapathonPublishSuccess"),
        type: "success",
      });
    } catch (error: any) {
      const errMessage =
        error?.data?.message ||
        error?.data?.general ||
        t("mapathonPublishError");
      showToast({ message: errMessage, type: "error" });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMapathon(mapathonId).unwrap();
      showToast({
        message: t("mapathonDeleteSuccess"),
        type: "success",
      });
      router.push("/mapathons");
    } catch (error: any) {
      const errMessage =
        error?.data?.message ||
        error?.data?.general ||
        t("mapathonDeleteError");
      showToast({ message: errMessage, type: "error" });
    } finally {
      setShowDeleteConfirm(false);
    }
  };

  return (
    <div className="bg-white shadow-lg my-3 rounded-md p-5 border-[1px] border-gray-100">
      <h3 className="font-bold text-xl mb-4">{t("mapathonActionsTitle")}</h3>

      <div className="flex flex-wrap gap-3">
        {/* Publish Button */}
        {canPublish && (
          <button
            onClick={handlePublish}
            disabled={isPublishing}
            className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
            {isPublishing
              ? t("mapathonPublishing")
              : t("mapathonPublishButton")}
          </button>
        )}

        {/* Delete Button */}
        {canDelete && !showDeleteConfirm && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 bg-red-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
            {t("mapathonDeleteButton")}
          </button>
        )}

        {/* Delete disabled tooltip */}
        {isCreator && !canDelete && (
          <div className="inline-flex items-center gap-2 bg-gray-100 text-gray-400 px-5 py-2.5 rounded-lg font-medium cursor-not-allowed">
            <Trash2 className="h-4 w-4" />
            <span>{t("mapathonDeleteButton")}</span>
            <span
              className="ml-1 text-xs text-gray-500"
              title={t("mapathonDeleteDisabledTooltip")}
            >
              ({t("mapathonDeleteDisabledShort")})
            </span>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {showDeleteConfirm && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-red-800">
                {t("mapathonDeleteConfirmTitle")}
              </p>
              <p className="text-sm text-red-600 mt-1">
                {t("mapathonDeleteConfirmMessage")}
              </p>
              <div className="flex gap-3 mt-3">
                <button
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700 disabled:opacity-50"
                >
                  {isDeleting
                    ? t("mapathonDeleting")
                    : t("mapathonDeleteConfirmButton")}
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="bg-white text-gray-700 px-4 py-2 rounded-md text-sm font-medium border hover:bg-gray-50"
                >
                  {t("mapathonDeleteCancelButton")}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
