"use client";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Mic, Check } from "lucide-react";
import { ExtractedReview, ConfidenceInfo } from "./VoiceReviewRecorder";

interface ReviewPreviewProps {
  extractedReview: ExtractedReview;
  transcription: string;
  confidence: ConfidenceInfo;
  onConfirm: (review: ExtractedReview) => void;
  onReRecord: () => void;
  isSubmitting: boolean;
}

interface AccessibilityField {
  key: string;
  label: string;
  type: "steps" | "boolean";
  category: string;
}

const ReviewPreview: React.FC<ReviewPreviewProps> = ({
  extractedReview,
  transcription,
  confidence,
  onConfirm,
  onReRecord,
  isSubmitting,
}) => {
  const { t } = useTranslation();
  const [editedReview, setEditedReview] =
    useState<ExtractedReview>(extractedReview);

  const accessibilityFields: AccessibilityField[] = [
    // Entrance
    { key: "steps", label: t("voiceReview.fields.steps") || "Steps at Entrance", type: "steps", category: "Entrance" },
    { key: "hasPermanentRamp", label: t("voiceReview.fields.permanentRamp") || "Permanent Ramp", type: "boolean", category: "Entrance" },
    { key: "hasWideEntrance", label: t("voiceReview.fields.wideEntrance") || "Wide Entrance", type: "boolean", category: "Entrance" },
    // Interior
    { key: "multipleFloors", label: t("voiceReview.fields.multipleFloors") || "Multiple Floors", type: "boolean", category: "Interior" },
    { key: "hasAccessibleElevator", label: t("voiceReview.fields.elevator") || "Accessible Elevator", type: "boolean", category: "Interior" },
    // Bathroom
    { key: "hasWashroom", label: t("voiceReview.fields.accessibleBathroom") || "Accessible Bathroom", type: "boolean", category: "Bathroom" },
    { key: "hasLargeStall", label: t("voiceReview.fields.largeStall") || "Wheelchair-Accessible Stall", type: "boolean", category: "Bathroom" },
    { key: "hasSupportAroundToilet", label: t("voiceReview.fields.grabBars") || "Grab Bars", type: "boolean", category: "Bathroom" },
  ];

  const handleFieldChange = (key: string, value: boolean | number | null) => {
    setEditedReview((prev) => ({ ...prev, [key]: value }));
  };

  const handleCommentsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedReview((prev) => ({ ...prev, comments: e.target.value }));
  };

  const groupedFields = accessibilityFields.reduce((acc, field) => {
    if (!acc[field.category]) {
      acc[field.category] = [];
    }
    acc[field.category].push(field);
    return acc;
  }, {} as Record<string, AccessibilityField[]>);

  const renderField = (field: AccessibilityField) => {
    const value = editedReview[field.key];

    if (field.type === "steps") {
      return (
        <select
          id={field.key}
          value={value === null || value === undefined ? "" : String(value)}
          onChange={(e) =>
            handleFieldChange(
              field.key,
              e.target.value === "" ? null : parseInt(e.target.value)
            )
          }
          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 cursor-pointer transition-colors hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        >
          <option value="">{t("voiceReview.notSure") || "Not Sure"}</option>
          <option value="0">{t("voiceReview.noSteps") || "No Steps"}</option>
          <option value="1">{t("voiceReview.oneStep") || "1 Step"}</option>
          <option value="2">{t("voiceReview.twoSteps") || "2 Steps"}</option>
          <option value="3">{t("voiceReview.threeOrMoreSteps") || "3+ Steps"}</option>
        </select>
      );
    }

    return (
      <select
        id={field.key}
        value={
          value === null || value === undefined
            ? ""
            : (value as boolean)
            ? "yes"
            : "no"
        }
        onChange={(e) =>
          handleFieldChange(
            field.key,
            e.target.value === "" ? null : e.target.value === "yes"
          )
        }
        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900 cursor-pointer transition-colors hover:border-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      >
        <option value="">{t("voiceReview.notSure") || "Not Sure"}</option>
        <option value="yes">{t("voiceReview.yes") || "Yes"}</option>
        <option value="no">{t("voiceReview.no") || "No"}</option>
      </select>
    );
  };

  return (
    <div
      className="bg-white rounded-xl p-6 shadow-lg"
      role="form"
      aria-label="Review Preview"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900">
          {t("voiceReview.reviewPreview") || "Review Preview"}
        </h2>
        {confidence && (
          <div
            className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-full text-sm font-medium"
            aria-label={`${confidence.fieldsExtracted} of ${confidence.totalFields} features detected`}
          >
            {confidence.fieldsExtracted} {t("voiceReview.featuresDetected") || "features detected"}
          </div>
        )}
      </div>

      {/* Transcription */}
      <section className="mb-6" aria-labelledby="transcription-heading">
        <h3
          id="transcription-heading"
          className="text-lg font-medium text-gray-700 mb-3"
        >
          {t("voiceReview.whatYouSaid") || "What You Said"}
        </h3>
        <blockquote className="m-0 p-4 bg-gray-50 border-l-4 border-blue-500 rounded-r-lg italic text-gray-700 leading-relaxed">
          "{transcription}"
        </blockquote>
      </section>

      {/* Extracted Features */}
      <section className="mb-6" aria-labelledby="features-heading">
        <h3
          id="features-heading"
          className="text-lg font-medium text-gray-700 mb-2"
        >
          {t("voiceReview.accessibilityFeatures") || "Accessibility Features"}
        </h3>
        <p className="text-sm text-gray-500 mb-4">
          {t("voiceReview.reviewInstructions") ||
            "Review and adjust the detected features. Change any incorrect values."}
        </p>

        {Object.entries(groupedFields).map(([category, fields]) => (
          <div key={category} className="mb-5">
            <h4 className="text-sm font-semibold text-blue-600 uppercase tracking-wide mb-3">
              {t(`voiceReview.categories.${category.toLowerCase()}`) || category}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {fields.map((field) => (
                <div key={field.key} className="flex flex-col gap-1">
                  <label
                    htmlFor={field.key}
                    className="text-sm font-medium text-gray-700"
                  >
                    {field.label}
                  </label>
                  {renderField(field)}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* Comments */}
      <section className="mb-6" aria-labelledby="comments-heading">
        <h3
          id="comments-heading"
          className="text-lg font-medium text-gray-700 mb-3"
        >
          {t("voiceReview.additionalComments") || "Additional Comments"}
        </h3>
        <textarea
          id="review-comments"
          value={editedReview.comments || ""}
          onChange={handleCommentsChange}
          placeholder={
            t("voiceReview.commentsPlaceholder") ||
            "Add any additional details about accessibility..."
          }
          className="w-full p-3 text-sm border border-gray-300 rounded-lg resize-y min-h-[100px] transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          rows={4}
          maxLength={500}
          aria-describedby="comments-count"
        />
        <div
          id="comments-count"
          className="mt-1 text-xs text-gray-400 text-right"
        >
          {(editedReview.comments || "").length}/500 {t("voiceReview.characters") || "characters"}
        </div>
      </section>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 justify-end pt-6 border-t border-gray-200">
        <button
          type="button"
          onClick={onReRecord}
          className="flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold bg-gray-100 text-gray-700 rounded-lg cursor-pointer transition-colors hover:bg-gray-200 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          <Mic className="w-5 h-5" />
          {t("voiceReview.reRecord") || "Re-record"}
        </button>
        <button
          type="button"
          onClick={() => onConfirm(editedReview)}
          className="flex items-center justify-center gap-2 px-6 py-3 text-base font-semibold bg-green-500 text-white rounded-lg cursor-pointer transition-colors hover:bg-green-600 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          <Check className="w-5 h-5" />
          {isSubmitting
            ? t("voiceReview.submitting") || "Submitting..."
            : t("voiceReview.submitReview") || "Submit Review"}
        </button>
      </div>
    </div>
  );
};

export default ReviewPreview;
