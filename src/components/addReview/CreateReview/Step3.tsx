import React, { useState } from "react";
import { createReviewValuesInterface } from "./interface";
interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  preStep: () => void;
  submit: (comment: string) => void;
  loading: boolean;
}

const Step3: React.FC<Props> = ({ preStep, submit, loading }) => {
  const [comment, setComment] = useState("");

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1">
        <label htmlFor="comment" className="block text-lg font-medium mb-2">
          Comment
        </label>
        <textarea
          id="comment"
          className="w-full h-24 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Please type something..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={preStep}
          className="bg-gray-300 text-black px-9 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={() => submit(comment)}
          className={`px-9 py-2 rounded-md ${
            loading
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-500 text-white"
          }`}
          disabled={loading}
        >
          {loading ? "Loading..." : "Next"}
        </button>
      </div>
    </div>
  );
};

export default Step3;
