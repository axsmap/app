import React, { useState } from "react";
import { createReviewValuesInterface } from "./interface";
import { Sparkle, X, Loader2, ChevronDown } from "lucide-react";
import { useAiReviewMutation } from "@/Services/modules/mapathon";
import { mapathon } from "@/Services/modules/mapathon/joinedMapathons";
import { useTranslation } from "react-i18next";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  preStep: () => void;
  submit: (comment: string) => void;
  loading: boolean;
  placeId?: string;
  mapathons?: mapathon[];
}

const Step4: React.FC<Props> = ({
  initialValues,
  preStep,
  submit,
  loading,
  placeId,
  mapathons,
}) => {
  const { t } = useTranslation();
  const [comment, setComment] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<string>(
    initialValues.current.step0.event || ""
  );
  const [generateComment, { isLoading }] = useAiReviewMutation();

  const genetateComment = async () => {
    try {
      if (isLoading) return;
      const res = await generateComment({
        ...initialValues.current?.step1,
        ...initialValues.current?.step2,
        ...initialValues.current?.step3,
        placeId: placeId,
      });
      console.log("Full response:", JSON.stringify(res, null, 2));
      // @ts-ignore
      const commentText = res?.data?.data || res?.data?.general || "";
      setComment(commentText);
    } catch (error: any) {
      console.error("Error generating comment:", error);
    }
  };

  const clearComment = () => {
    setComment("");
  };

  const handleEventChange = (eventId: string) => {
    setSelectedEvent(eventId);
    initialValues.current.step0.event = eventId || null;
  };

  const handleSubmit = () => {
    // Ensure the event selection is saved before submit
    initialValues.current.step0.event = selectedEvent || null;
    submit(comment);
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1">
        {/* Mapathon dropdown — only if user has active joined mapathons */}
        {mapathons && mapathons.length > 0 && (
          <div className="mb-4">
            <label
              htmlFor="mapathon-select"
              className="text-[14px] font-medium text-gray-700 mb-1 block"
            >
              {t("applyMapathonLabel")}
            </label>
            <div className="relative">
              <select
                id="mapathon-select"
                value={selectedEvent}
                onChange={(e) => handleEventChange(e.target.value)}
                className="w-full appearance-none p-3 pr-10 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-[14px] text-gray-800"
              >
                <option value="">{t("doNotApplyMapathon")}</option>
                {mapathons.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
              />
            </div>
          </div>
        )}

        <div className="flex justify-between items-center mt-3 mb-2">
          <label htmlFor="comment" className="text-[16px] font-medium">
            {t("comment")}
          </label>
          <button
            onClick={genetateComment}
            disabled={isLoading}
            className="flex items-center gap-x-2 cursor-pointer hover:opacity-80 transition-opacity disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Sparkle size={18} />
            )}
            <span className="text-[14px] font-medium">
              {isLoading ? t("generating") : t("generateComment")}
            </span>
          </button>
        </div>
        <div className="relative">
          <textarea
            id="comment"
            className="w-full h-[120px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            placeholder={t("commentPlaceholder")}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {comment.length > 0 && (
            <button
              onClick={clearComment}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              title={t("clearComment")}
            >
              <X size={16} className="text-gray-500" />
            </button>
          )}
        </div>
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="px-10 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-full shadow-md transition-all duration-200"
          onClick={preStep}
        >
          {t("back")}
        </button>
        <button
          className={`px-10 py-3 bg-primary hover:bg-primary-primary text-gray-800 font-semibold rounded-full shadow-md transition-all duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? t("submitting") : t("submit")}
        </button>
      </div>
    </div>
  );
};

export default Step4;
