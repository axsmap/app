import React, { useState } from "react";
import { createReviewValuesInterface } from "./interface";
import { Sparkle, X, Loader2 } from "lucide-react";
import { useAiReviewMutation } from "@/Services/modules/mapathon";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  preStep: () => void;
  submit: (comment: string) => void;
  loading: boolean;
  placeId?: string;
}

const Step4: React.FC<Props> = ({
  initialValues,
  preStep,
  submit,
  loading,
  placeId,
}) => {
  const [comment, setComment] = useState("");
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

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1">
        <div className="flex justify-between items-center mt-3 mb-2">
          <label htmlFor="comment" className="text-[16px] font-medium">
            Comment
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
              {isLoading ? "Generating..." : "Generate Comment"}
            </span>
          </button>
        </div>
        <div className="relative">
          <textarea
            id="comment"
            className="w-full h-[120px] p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none"
            placeholder="Write your comments, advice, tips, etc..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          {comment.length > 0 && (
            <button
              onClick={clearComment}
              className="absolute top-2 right-2 p-1 rounded-full hover:bg-gray-200 transition-colors"
              title="Clear comment"
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
          Back
        </button>
        <button
          className={`px-10 py-3 bg-primary hover:bg-primary-primary text-gray-800 font-semibold rounded-full shadow-md transition-all duration-200 ${
            loading ? "opacity-70 cursor-not-allowed" : ""
          }`}
          onClick={() => submit(comment)}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </div>
  );
};

export default Step4;
