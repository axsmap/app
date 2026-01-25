"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { X, AlertTriangle } from "lucide-react";
import VoiceReviewRecorder, {
  ExtractedReview,
  ConfidenceInfo,
} from "./VoiceReviewRecorder";
import ReviewPreview from "./ReviewPreview";

interface VoiceReviewFlowProps {
  placeId: string;
  placeName?: string;  // Alias for venueName
  venueName?: string;
  token: string;
  onSubmitSuccess?: (result: any) => void;
  onSuccess?: (reviewId: string) => void;  // Alias for onSubmitSuccess
  onClose?: () => void;
  onCancel?: () => void;  // Alias for onClose
}

const VoiceReviewFlow: React.FC<VoiceReviewFlowProps> = ({
  placeId,
  placeName,
  venueName,
  token,
  onSubmitSuccess,
  onSuccess,
  onClose,
  onCancel,
}) => {
  // Support both prop naming conventions
  const displayName = placeName || venueName || "";
  const handleSuccess = onSuccess || ((result: any) => onSubmitSuccess?.(result));
  const handleClose = onCancel || onClose;
  const { t } = useTranslation();
  const [step, setStep] = useState<"record" | "preview">("record");
  const [extractedReview, setExtractedReview] = useState<ExtractedReview | null>(
    null
  );
  const [transcription, setTranscription] = useState("");
  const [confidence, setConfidence] = useState<ConfidenceInfo | null>(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewExtracted = (
    review: ExtractedReview,
    transcript: string,
    conf: ConfidenceInfo
  ) => {
    setExtractedReview(review);
    setTranscription(transcript);
    setConfidence(conf);
    setError("");
    setStep("preview");
  };

  const handleError = (errorMessage: string) => {
    setError(errorMessage);
  };

  const handleReRecord = () => {
    setStep("record");
    setExtractedReview(null);
    setTranscription("");
    setConfidence(null);
  };

  const handleSubmit = async (finalReview: ExtractedReview) => {
    setIsSubmitting(true);
    setError("");

    try {
      // Convert null values to undefined for the API
      const reviewData = {
        place: placeId,
        ...Object.fromEntries(
          Object.entries(finalReview).filter(([_, v]) => v !== null)
        ),
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/reviews`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(reviewData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        handleSuccess?.(result?.venue || result?.id || placeId);
      } else {
        throw new Error(
          result.general || result.error || "Failed to submit review"
        );
      }
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(
        err.message ||
          t("voiceReview.errors.submitFailed") ||
          "Failed to submit review. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="voice-review-flow">
      {/* Error Message */}
      {error && (
        <div
          className="flex items-center gap-3 p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
          role="alert"
        >
          <AlertTriangle className="w-5 h-5 flex-shrink-0" />
          <p className="flex-1 text-sm">{error}</p>
          <button
            onClick={() => setError("")}
            className="p-1 hover:bg-red-100 rounded-full transition-colors"
            aria-label={t("voiceReview.dismissError") || "Dismiss error"}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Content */}
      {step === "record" ? (
        <VoiceReviewRecorder
          placeId={placeId}
          token={token}
          onReviewExtracted={handleReviewExtracted}
          onError={handleError}
        />
      ) : extractedReview && confidence ? (
        <ReviewPreview
          extractedReview={extractedReview}
          transcription={transcription}
          confidence={confidence}
          onConfirm={handleSubmit}
          onReRecord={handleReRecord}
          isSubmitting={isSubmitting}
        />
      ) : null}

      {/* Alternative: Manual Entry Link - only show if onCancel is provided */}
      {step === "record" && handleClose && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {t("voiceReview.preferTyping") || "Prefer typing?"}{" "}
            <button 
              onClick={handleClose}
              className="text-blue-600 hover:underline"
            >
              {t("voiceReview.fillManually") || "Fill out the form manually"}
            </button>
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceReviewFlow;
