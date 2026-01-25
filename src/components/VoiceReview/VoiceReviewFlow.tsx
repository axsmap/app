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
  venueName: string;
  token: string;
  onSubmitSuccess?: (result: any) => void;
  onClose?: () => void;
}

const VoiceReviewFlow: React.FC<VoiceReviewFlowProps> = ({
  placeId,
  venueName,
  token,
  onSubmitSuccess,
  onClose,
}) => {
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
        onSubmitSuccess?.(result);
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          {t("voiceReview.reviewTitle") || "Review"}: {venueName}
        </h1>
        {onClose && (
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label={t("voiceReview.close") || "Close review form"}
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        )}
      </div>

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

      {/* Alternative: Manual Entry Link */}
      {step === "record" && (
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            {t("voiceReview.preferTyping") || "Prefer typing?"}{" "}
            <a href="#manual" className="text-blue-600 hover:underline">
              {t("voiceReview.fillManually") || "Fill out the form manually"}
            </a>
          </p>
        </div>
      )}
    </div>
  );
};

export default VoiceReviewFlow;
