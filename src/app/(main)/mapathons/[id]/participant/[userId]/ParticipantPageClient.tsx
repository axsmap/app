"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/Store";
import {
  MessageSquare,
  Share2,
  Mail,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  Check,
  Pencil,
  Save,
  X,
} from "lucide-react";
import { showToast } from "@/components/toast";
import { useUpdateParticipantMessageMutation } from "@/Services/modules/mapathon";

interface ParticipantPageClientProps {
  mapathonId: string;
  userId: string;
  mapathonName: string;
  mapathonAddress: string;
  mapathonStartDate: string;
  mapathonEndDate: string;
  mapathonReviewsGoal: number;
  placesMapped: number;
  userName: string;
  initialPersonalMessage?: string;
}

const DEFAULT_MESSAGE =
  "I'm helping map accessibility in my community. Join me to make spaces more inclusive.";

export default function ParticipantPageClient({
  mapathonId,
  userId,
  mapathonName,
  mapathonAddress,
  mapathonStartDate,
  mapathonEndDate,
  mapathonReviewsGoal,
  placesMapped,
  userName,
  initialPersonalMessage,
}: ParticipantPageClientProps) {
  const currentUserId = useAppSelector((state) => state.user.user?.id);
  const isOwner = currentUserId === userId;
  const [updateMessage, { isLoading: isSaving }] =
    useUpdateParticipantMessageMutation();

  const resolvedInitial = initialPersonalMessage?.trim()
    ? initialPersonalMessage
    : DEFAULT_MESSAGE;

  const [personalMessage, setPersonalMessage] = useState(resolvedInitial);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(resolvedInitial);
  const [copied, setCopied] = useState(false);
  const [pageUrl, setPageUrl] = useState("");
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const origin = window.location.origin;
      setPageUrl(window.location.href);
      setShareUrl(
        `${origin}/share/mapathon/${mapathonId}/participant/${userId}`
      );
    }
  }, [mapathonId, userId]);

  const handleSaveMessage = async () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    try {
      await updateMessage({
        eventId: mapathonId,
        userId,
        personalMessage: trimmed,
      }).unwrap();
      setPersonalMessage(trimmed);
      setIsEditing(false);
      showToast({ message: "Message saved!", type: "success" });
    } catch {
      showToast({
        message: "Failed to save message. Please try again.",
        type: "error",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditText(personalMessage);
    setIsEditing(false);
  };

  const shareText = `Support my accessibility Mapathon: ${shareUrl || pageUrl}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl || pageUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl || pageUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareToSMS = () => {
    window.open(`sms:?body=${encodeURIComponent(shareText)}`, "_self");
  };

  const shareToEmail = () => {
    window.open(
      `mailto:?subject=${encodeURIComponent(
        `Join me at ${mapathonName} - AXS Map`
      )}&body=${encodeURIComponent(shareText)}`,
      "_self"
    );
  };

  const shareToFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl || pageUrl
      )}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        shareUrl || pageUrl
      )}&text=${encodeURIComponent(
        `I'm participating in ${mapathonName} on @axsmap! Help me map accessibility in my community.`
      )}`,
      "_blank",
      "width=600,height=400"
    );
  };

  const shareToLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        shareUrl || pageUrl
      )}`,
      "_blank",
      "width=600,height=400"
    );
  };

  return (
    <>
      {/* Personal Message */}
      <div className="flex items-start gap-3">
        <MessageSquare className="w-5 h-5 text-gray-400 mt-1 flex-shrink-0" />
        <div className="flex-1">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                maxLength={280}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                placeholder="Write a personal message..."
              />
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400">
                  {editText.length}/280
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={handleCancelEdit}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <X className="w-3.5 h-3.5" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveMessage}
                    disabled={isSaving}
                    className="flex items-center gap-1 px-3 py-1.5 text-sm text-black bg-primary rounded-lg hover:bg-primary/90 font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <Save className="w-3.5 h-3.5" />
                    {isSaving ? "Saving..." : "Save"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between gap-2">
              <p className="text-gray-700 text-sm leading-relaxed italic">
                &ldquo;{personalMessage}&rdquo;
              </p>
              {isOwner && (
                <button
                  onClick={() => {
                    setEditText(personalMessage);
                    setIsEditing(true);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                  aria-label="Edit message"
                  title="Edit your personal message"
                >
                  <Pencil className="w-4 h-4" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* AXS Map Logo */}
      <div className="flex justify-end mt-4">
        <img
          src="/axs-map-v6.svg"
          alt="AXS Map"
          className="h-12 object-contain"
        />
      </div>

      {/* Share Section */}
      <div className="mt-6 pt-5 border-t border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Share2 className="w-4 h-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">
            Share this page
          </span>
        </div>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <button
            onClick={shareToSMS}
            className="flex flex-col items-center gap-1 group"
            aria-label="Share via Text"
          >
            <div className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
              <span className="text-white text-lg">💬</span>
            </div>
            <span className="text-xs text-gray-600">Text</span>
          </button>

          <button
            onClick={shareToEmail}
            className="flex flex-col items-center gap-1 group"
            aria-label="Share via Email"
          >
            <div className="w-11 h-11 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors">
              <Mail className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-600">Email</span>
          </button>

          <button
            onClick={shareToFacebook}
            className="flex flex-col items-center gap-1 group"
            aria-label="Share on Facebook"
          >
            <div className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center group-hover:opacity-90 transition-opacity">
              <Facebook className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-600">FB</span>
          </button>

          <button
            onClick={shareToTwitter}
            className="flex flex-col items-center gap-1 group"
            aria-label="Share on X"
          >
            <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center group-hover:bg-gray-800 transition-colors">
              <Twitter className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-600">X</span>
          </button>

          <button
            onClick={shareToLinkedIn}
            className="flex flex-col items-center gap-1 group"
            aria-label="Share on LinkedIn"
          >
            <div className="w-11 h-11 rounded-full bg-[#0A66C2] flex items-center justify-center group-hover:opacity-90 transition-opacity">
              <Linkedin className="w-5 h-5 text-white" />
            </div>
            <span className="text-xs text-gray-600">LinkedIn</span>
          </button>

          <button
            onClick={handleCopyLink}
            className="flex flex-col items-center gap-1 group"
            aria-label="Copy link"
          >
            <div
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors ${
                copied
                  ? "bg-green-500"
                  : "bg-gray-800 group-hover:bg-gray-700"
              }`}
            >
              {copied ? (
                <Check className="w-5 h-5 text-white" />
              ) : (
                <Link2 className="w-5 h-5 text-white" />
              )}
            </div>
            <span className="text-xs text-gray-600">
              {copied ? "Copied!" : "Copy Link"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
