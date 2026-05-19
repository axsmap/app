"use client";

import { useEffect, useRef, useState } from "react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";
import FacebookIcon from "@/assets/icons/facebook-icon";
import TwitterIcon from "@/assets/icons/twitter-icon";
import { useAppSelector } from "@/Store";
import { useTranslation } from "react-i18next";
import { useJoinMapathonMutation, useEventDetailsQuery } from "@/Services/modules/mapathon";
import { validateLogin } from "@/components/AuthModal/handleAuthModal";
import { showToast } from "@/components/toast";
import { Link2, Mail, MapPin, MessageSquare, Share2, X } from "lucide-react";

interface MapathonDetails {
  id: string;
  name: string;
  description: string;
  location: {
    coordinates: [number, number];
  };
  startDate: string;
  endDate: string;
  address: string;
  participants: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
  managers: Array<{
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }>;
}

interface Props {
  mapathonDetails: MapathonDetails;
}

export default function MapathonClientComponent({ mapathonDetails }: Props) {
  const [url, setUrl] = useState("");
  const [shareUrl, setShareUrl] = useState("");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedAction, setCopiedAction] = useState<"link" | "email" | null>(
    null
  );
  const [showEmailTemplate, setShowEmailTemplate] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const userId = useAppSelector((state) => state.user.user?.id);
  const { t } = useTranslation();
  const [joinMapathon, { isLoading: isJoining }] = useJoinMapathonMutation();

  // Use live data from RTK Query to get updated participants after joining
  const { data: liveData } = useEventDetailsQuery(mapathonDetails.id, {
    pollingInterval: 30000,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUrl(window.location.href);
      const origin = window.location.origin;
      setShareUrl(`${origin}/mapathons/${mapathonDetails.id}`);
    }
  }, [mapathonDetails.id]);

  useEffect(() => {
    if (!isShareModalOpen) return;

    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeShareModal();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isShareModalOpen]);

  const handleJoinMapathon = async () => {
    if (!userId) return;
    try {
      await joinMapathon({
        eventId: mapathonDetails.id,
        userId,
      }).unwrap();
      showToast({
        message: t("mapathonJoinSuccess"),
        type: "success",
      });
    } catch (error: any) {
      const errMessage =
        error?.data?.message ||
        error?.data?.general ||
        t("mapathonJoinError");
      showToast({ message: errMessage, type: "error" });
    }
  };

  const handleGetDirections = () => {
    if (mapathonDetails?.location?.coordinates) {
      const [lng, lat] = mapathonDetails.location.coordinates;
      window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, "_blank");
    }
  };

  const mapathonShareUrl = shareUrl || url;
  const mapathonShareText = t("shareMapathonInviteText", {
    name: mapathonDetails.name,
    address: mapathonDetails.address,
  });
  const mapathonInviteMessage = `${mapathonShareText}

${mapathonShareUrl}`;

  const closeShareModal = () => {
    setIsShareModalOpen(false);
    setCopiedAction(null);
    setShowEmailTemplate(false);
    shareButtonRef.current?.focus();
  };

  const copyToClipboard = async (
    textToCopy: string,
    action: "link" | "email"
  ) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = textToCopy;
        textarea.setAttribute("readonly", "");
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }

      setCopiedAction(action);
      // Reset the inline "Copied!" indicator after a couple of seconds so
      // the modal feels live even if the user copies the same thing twice.
      setTimeout(() => {
        setCopiedAction((current) => (current === action ? null : current));
      }, 2000);
      showToast({ message: t("shareMapathonCopyToast"), type: "success" });
    } catch {
      showToast({
        message: t("shareMapathonCopyErrorToast"),
        type: "error",
      });
    }
  };

  const copyLink = () => copyToClipboard(mapathonShareUrl, "link");

  const textInvite = () => {
    // The `&body=` separator is only required by iOS Mobile Safari (per
    // RFC 5724 the canonical form is `sms:?body=`). Restricting to actual
    // iOS UAs avoids the edge case of macOS Continuity links breaking.
    const isAppleMobile = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const bodySeparator = isAppleMobile ? "&" : "?";

    showToast({
      message: t("shareMapathonOpeningMessages"),
      type: "success",
    });
    window.location.href = `sms:${bodySeparator}body=${encodeURIComponent(
      mapathonInviteMessage
    )}`;
  };

  const emailSubject = t("shareMapathonEmailSubject", {
    name: mapathonDetails.name,
  });
  const emailTemplate = `Subject: ${emailSubject}

${mapathonInviteMessage}`;

  const shareToWhatsApp = () => {
    window.open(
      `https://wa.me/?text=${encodeURIComponent(mapathonInviteMessage)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  const shareToFacebook = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(mapathonInviteMessage);
        showToast({
          message: t("shareMapathonFacebookCopiedToast"),
          type: "success",
        });
      }
    } catch {
      showToast({
        message: t("shareMapathonFacebookFallbackToast"),
        type: "info",
      });
    }

    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        mapathonShareUrl
      )}&quote=${encodeURIComponent(mapathonShareText)}`,
      "_blank",
      "width=600,height=500,noopener,noreferrer"
    );
  };

  const shareToX = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        mapathonShareUrl
      )}&text=${encodeURIComponent(mapathonShareText)}`,
      "_blank",
      "width=600,height=500,noopener,noreferrer"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        mapathonShareUrl
      )}`,
      "_blank",
      "width=600,height=500,noopener,noreferrer"
    );
  };

  const handleShareMapathon = async () => {
    // `navigator.share` is typed as always defined in lib.dom but is missing
    // on desktop browsers at runtime — use feature detection via `"share" in`
    // and gate on touch/small screens so desktops always get the modal.
    const shouldUseNativeShare =
      typeof navigator !== "undefined" &&
      "share" in navigator &&
      typeof navigator.share === "function" &&
      (window.matchMedia("(pointer: coarse)").matches ||
        window.innerWidth < 768);

    if (shouldUseNativeShare) {
      try {
        await navigator.share({
          title: mapathonDetails.name,
          text: mapathonInviteMessage,
          url: mapathonShareUrl,
        });
        return;
      } catch (error) {
        if ((error as { name?: string })?.name === "AbortError") return;
      }
    }
    setIsShareModalOpen(true);
  };

  const isUserParticipant = [
    ...(liveData?.participants ?? mapathonDetails?.participants ?? []),
    ...(liveData?.managers ?? mapathonDetails?.managers ?? []),
  ]?.some((participant) => participant?.id === userId);

  const shareMapathonButton = (
    <button
      ref={shareButtonRef}
      onClick={handleShareMapathon}
      className="inline-flex items-center gap-1.5 bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      aria-haspopup="dialog"
      aria-expanded={isShareModalOpen}
    >
      <Share2 className="h-4 w-4" aria-hidden="true" />
      {t("shareMapathonButton")}
    </button>
  );

  return (
    <>
      {isShareModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 px-4 py-5 sm:items-center"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeShareModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="share-mapathon-title"
            aria-describedby="share-mapathon-description"
            className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-5 shadow-xl"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="share-mapathon-title"
                  className="text-lg font-bold text-black"
                >
                  {t("shareMapathonTitle")}
                </h2>
                <p
                  id="share-mapathon-description"
                  className="mt-1 text-sm text-gray-600"
                >
                  {t("shareMapathonDescription")}
                </p>
              </div>
              <button
                ref={closeButtonRef}
                onClick={closeShareModal}
                className="rounded-md p-2 text-gray-500 hover:bg-gray-100 hover:text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={t("shareMapathonCloseLabel")}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="mt-5 space-y-3">
              <button
                onClick={textInvite}
                className="flex w-full items-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-left text-black hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <MessageSquare className="h-5 w-5" aria-hidden="true" />
                {t("shareMapathonTextInvite")}
              </button>

              <button
                onClick={copyLink}
                className="flex w-full items-center justify-between gap-3 rounded-md border border-gray-300 px-4 py-3 text-left text-black hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="inline-flex items-center gap-3">
                  <Link2 className="h-5 w-5" aria-hidden="true" />
                  {t("shareMapathonCopyLink")}
                </span>
                <span aria-live="polite" className="text-sm font-medium text-green-700">
                  {copiedAction === "link" ? t("shareMapathonCopied") : ""}
                </span>
              </button>

              <button
                onClick={shareToWhatsApp}
                className="flex w-full items-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-left text-black hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FaWhatsapp
                  className="h-5 w-5 text-[#25D366]"
                  aria-hidden="true"
                />
                WhatsApp
              </button>

              <button
                onClick={shareToFacebook}
                className="flex w-full items-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-left text-black hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="flex h-5 w-5 items-center justify-center" aria-hidden="true">
                  <FacebookIcon />
                </span>
                Facebook
              </button>

              <button
                onClick={shareToX}
                className="flex w-full items-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-left text-black hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <span className="flex h-5 w-5 items-center justify-center" aria-hidden="true">
                  <TwitterIcon />
                </span>
                X
              </button>

              <button
                onClick={shareToLinkedIn}
                className="flex w-full items-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-left text-black hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <FaLinkedin
                  className="h-5 w-5 text-[#0A66C2]"
                  aria-hidden="true"
                />
                LinkedIn
              </button>

              <button
                onClick={() => setShowEmailTemplate((isShown) => !isShown)}
                className="flex w-full items-center gap-3 rounded-md border border-gray-300 px-4 py-3 text-left text-black hover:bg-gray-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-expanded={showEmailTemplate}
              >
                <Mail className="h-5 w-5" aria-hidden="true" />
                {t("shareMapathonEmailTemplate")}
              </button>

              {showEmailTemplate && (
                <div className="rounded-md border border-gray-300 bg-gray-50 p-3">
                  <label
                    htmlFor="share-email-template"
                    className="text-sm font-medium text-gray-700"
                  >
                    {t("shareMapathonEmailTemplateLabel")}
                  </label>
                  <textarea
                    id="share-email-template"
                    readOnly
                    value={emailTemplate}
                    rows={7}
                    className="mt-2 w-full resize-none rounded-md border border-gray-300 bg-white p-3 text-sm text-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  />
                  <button
                    onClick={() => copyToClipboard(emailTemplate, "email")}
                    className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                    aria-live="polite"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    {copiedAction === "email"
                      ? t("shareMapathonCopied")
                      : t("shareMapathonCopyEmailTemplate")}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Join Button + Get Directions */}
      {!isUserParticipant && (
        <div className="flex flex-wrap items-center mt-4 gap-3">
          <button
            onClick={validateLogin(handleJoinMapathon)}
            disabled={isJoining}
            className="bg-primary text-black px-4 py-2 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isJoining
              ? t("mapathonJoining")
              : t("mapathonJoinButton")}
          </button>
          {shareMapathonButton}
          {mapathonDetails?.location?.coordinates && (
            <button
              onClick={handleGetDirections}
              className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              {t("mapathonGetDirections")}
            </button>
          )}
        </div>
      )}

      {/* Already Joined + Get Directions */}
      {isUserParticipant && (
        <div className="flex flex-wrap items-center mt-4 gap-3">
          {shareMapathonButton}
          {mapathonDetails?.location?.coordinates && (
            <button
              onClick={handleGetDirections}
              className="inline-flex items-center gap-1.5 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors"
            >
              <MapPin className="h-4 w-4" />
              {t("mapathonGetDirections")}
            </button>
          )}
        </div>
      )}
    </>
  );
}
