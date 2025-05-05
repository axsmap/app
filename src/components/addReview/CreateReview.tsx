"use client";
import { FC, useCallback, useRef, useState } from "react";
import { useCreateReviewMutation } from "@/Services/modules/mapathon";
import Step1 from "./CreateReview/Step1";
import Step2 from "./CreateReview/Step2";
import Step3 from "./CreateReview/Step3";
import Step4 from "./CreateReview/Step4";
import { createReviewValuesInterface } from "./CreateReview/interface";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const titles = {
  1: "EXTERIOR",
  2: "INTERIOR",
  3: "RESTROOM",
  4: "COMMENT",
};

interface CreateReviewProps {
  handleRefetch: () => void;
}

const CreateReview: FC<CreateReviewProps> = ({ handleRefetch }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const placeId = searchParams.get("placeId");

  const router = useRouter();
  const [activeStep, setActiveStep] = useState<1 | 2 | 3 | 4>(1);
  const [createReview, { isLoading: loading }] = useCreateReviewMutation();

  const valuesRef = useRef<createReviewValuesInterface>({
    step1: {},
    step2: {},
    step3: {},
    step4: {},
  });

  const nextStep = useCallback(() => {
    setActiveStep((prev) => (prev < 4 ? ((prev + 1) as 1 | 2 | 3 | 4) : prev));
  }, []);

  const preStep = useCallback(() => {
    setActiveStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));
  }, []);

  const onPressSubmit = useCallback(
    async (comment: string) => {
      try {
        const reviewData = {
          ...valuesRef.current.step1,
          ...valuesRef.current.step2,
          ...valuesRef.current.step3,
          comment: comment,
          place: placeId,
        };

        const res = await createReview(reviewData as any).unwrap();
        const query = new URLSearchParams({
          userReviewFieldsAmount: String(res?.userReviewFieldsAmount ?? ""),
          userReviewsAmount: String(res?.userReviewsAmount ?? ""),
          venue: res?.venue ?? "",
        }).toString();

        router.push(`/thank-you?${query}`);
      } catch (error) {
        console.log(error);
      }
    },
    [createReview, placeId, router]
  );

  const progressWidth = ((activeStep - 1) / 3) * 90 + 10;

  return (
    <div className="flex flex-col bg-white p-4">
      <div className="mb-4">
        <h1 className="text-xl font-semibold text-center text-secondary">
          {name}
        </h1>
      </div>
      <div className="bg-white p-4 rounded-lg flex-1 shadow-lg">
        <h2 className="text-lg text-center font-semibold text-secondary">
          {titles[activeStep]}
        </h2>

        <div className="relative w-full mb-6">
          <div
            className="absolute top-0 left-0 h-2 bg-gray-300 rounded-lg"
            style={{ width: "100%", height: "10px" }}
          />
          <motion.div
            className="absolute top-0 left-0 h-2 bg-yellow-500 rounded-lg"
            animate={{ width: `${progressWidth}%` }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
            style={{ height: "10px" }}
          />
        </div>

        {activeStep === 1 ? (
          <Step1 initialValues={valuesRef} nextStep={nextStep} />
        ) : activeStep === 2 ? (
          <Step2
            initialValues={valuesRef}
            preStep={preStep}
            nextStep={nextStep}
          />
        ) : activeStep === 3 ? (
          <Step3
            initialValues={valuesRef}
            preStep={preStep}
            nextStep={nextStep}
          />
        ) : (
          <Step4
            initialValues={valuesRef}
            preStep={preStep}
            submit={onPressSubmit}
            loading={loading}
          />
        )}
      </div>
    </div>
  );
};

export default CreateReview;
