import React, { useState } from "react";
import { createReviewValuesInterface } from "./interface";
import { Sparkle } from "lucide-react";
import { useAiReviewMutation } from "@/Services/modules/mapathon";
interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  preStep: () => void;
  submit: (comment: string) => void;
  loading: boolean;
}

const Step4: React.FC<Props> = ({
  initialValues,
  preStep,
  submit,
  loading,
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
      });
      console.log(res?.data?.data)
      // @ts-ignore
      setComment(res?.data?.data);
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1">
        <div className="flex justify-between mt-3">
          <label htmlFor="comment" className="text-[16px] font-medium mb-2">
            Comment
          </label>
          <div onClick={genetateComment} className="flex items-center gap-x-2">
            <Sparkle size={20} />
            <p className="text-[16px] font-[500]">
              {isLoading ? "Loading..." : "Generate Comment"}
            </p>
          </div>
        </div>
        <textarea
          id="comment"
          className="w-full h-[120px] p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Share your thoughts about this location's accessibility..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="flex mt-5 gap-x-4">
        <button
          className="w-full bg-gray-300 rounded-[8px] py-3"
          onClick={preStep}
        >
          Back
        </button>
        <button
          className={`w-full bg-primary rounded-[8px] py-3 
             ${loading ? " text-white cursor-not-allowed" : " text-white"}`}
          onClick={() => submit(comment)}
          disabled={loading}
        >
          {loading ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Step4;
