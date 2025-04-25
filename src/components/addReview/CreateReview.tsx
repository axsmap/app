"use client";
import { FC, useCallback, useRef, useState } from "react";
import { useCreateReviewMutation } from "@/Services/modules/mapathon";
import Step1 from "./CreateReview/Step1";
import Step2 from "./CreateReview/Step2";
import Step3 from "./CreateReview/Step3";
import { createReviewValuesInterface } from "./CreateReview/interface";
import { useRouter, useSearchParams } from "next/navigation";

const progressWidth = 100;

const titles = {
  1: "EXTERIOR",
  2: "INTERIOR",
  3: "COMMENT",
};

interface CreateReviewProps {
  handleRefetch: () => void;
}

const CreateReview: FC<CreateReviewProps> = ({ handleRefetch }) => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const placeId = searchParams.get("placeId");

  const router = useRouter();
  const [activeStep, setActiveStep] = useState<1 | 2 | 3>(1);
  const [progressWidthState, setProgressWidthState] = useState(
    progressWidth / 3
  );
  const [createReview, { isLoading: loading }] = useCreateReviewMutation();

  const valuesRef = useRef<createReviewValuesInterface>({
    step1: {},
    step2: {},
    step3: {},
  });

  const nextStep = useCallback(() => {
    if (activeStep <= 3) {
      setActiveStep((activeStep + 1) as 1 | 2 | 3);
      setProgressWidthState(progressWidthState + progressWidth / 3);
    }
  }, [activeStep, progressWidthState]);

  const preStep = useCallback(() => {
    if (activeStep !== 1) {
      setActiveStep((activeStep - 1) as 1 | 2 | 3);
      setProgressWidthState(progressWidthState - progressWidth / 3);
    }
  }, [activeStep, progressWidthState]);

  const onPressSubmit = useCallback(async (comment: string) => {
    try {
      const reviewData = {
        ...valuesRef.current.step1,
        ...valuesRef.current.step2,
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
  });

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
            style={{ width: `${progressWidth}px`, height: "10px" }}
          ></div>
          <div
            className="absolute top-0 left-0 h-2 bg-primary rounded-lg"
            style={{
              width: `${progressWidthState}px`,
              transition: "all 0.3s ease",
            }}
          ></div>
        </div>

        {activeStep === 1 ? (
          <Step1 initialValues={valuesRef} nextStep={nextStep} />
        ) : activeStep === 2 ? (
          <Step2
            initialValues={valuesRef}
            preStep={preStep}
            nextStep={nextStep}
          />
        ) : (
          <Step3
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
