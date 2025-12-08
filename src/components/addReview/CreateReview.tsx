"use client";
import {
  useCreateReviewMutation,
  useLazyJoinedMapathonQuery,
} from "@/Services/modules/mapathon";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Step1 from "./CreateReview/Step1";
import Step2 from "./CreateReview/Step2";
import Step3 from "./CreateReview/Step3";
import Step4 from "./CreateReview/Step4";
import {
  createReviewValuesInterface,
  initialValues,
} from "./CreateReview/interface";
import { createReview, createReviewHandler } from "./interface";
import { useAppSelector } from "@/Store";
import Step0 from "./CreateReview/Step0";

type steps = 0 | 1 | 2 | 3 | 4;

const titles = {
  0: "MAPATHON",
  1: "EXTERIOR",
  2: "INTERIOR",
  3: "RESTROOM",
  4: "COMMENT",
};

interface CreateReviewProps {
  handleRefetch: () => void;
}

const CreateReview = forwardRef<createReviewHandler, {}>(({}, ref) => {
  const [show, setShow] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({ placeId: "", name: "" });
  const token = useAppSelector((state) => state.token?.token);

  const [allJoinMapathins, { isLoading, data }] = useLazyJoinedMapathonQuery();

  const router = useRouter();
  const [activeStep, setActiveStep] = useState<steps>(1);
  const [createReview, { isLoading: loading }] = useCreateReviewMutation();

  const valuesRef = useRef<createReviewValuesInterface>(
    JSON.parse(JSON.stringify(initialValues))
  );

  const nextStep = useCallback(() => {
    console.log("next");
    setActiveStep((prev) => (prev < 4 ? ((prev + 1) as steps) : prev));
  }, []);

  const preStep = useCallback(() => {
    setActiveStep((prev) => (prev > 0 ? ((prev - 1) as steps) : prev));
  }, []);

  useEffect(() => {
    if (token) {
      allJoinMapathins({});
    }
  }, [token]);

  useEffect(() => {
    if (data?.results && data?.results?.length > 0) {
      setActiveStep(0);
    }
  }, [data]);

  const onPressSubmit = useCallback(
    async (comment: string) => {
      try {
        const event = valuesRef?.current?.step0?.event;
        const reviewData = {
          ...valuesRef.current.step1,
          ...valuesRef.current.step2,
          ...valuesRef.current.step3,
          comment: comment,
          place: placeInfo?.placeId,
          ...(event && { event }),
        };

        const res = await createReview(reviewData as any).unwrap();
        const query = new URLSearchParams({
          userReviewFieldsAmount: String(res?.userReviewFieldsAmount ?? ""),
          userReviewsAmount: String(res?.userReviewsAmount ?? ""),
          venue: res?.venue ?? "",
        }).toString();
        hideModal()
        router.push(`/thank-you?${query}`);
      } catch (error) {
        console.log(error);
      }
    },
    [createReview, placeInfo, router]
  );

  const progressWidth = ((activeStep - 1) / 3) * 90 + 10;

  const showModal = useCallback(
    (e: createReview) => {
      setPlaceInfo({ name: e.name, placeId: e.placeId });
      if (data?.results && data?.results?.length > 0) {
        setActiveStep(0);
      } else {
        setActiveStep(1);
      }
      setShow(true);
    },
    [data]
  );
  const hideModal = useCallback(() => {
    setActiveStep(1);
    valuesRef.current = JSON.parse(JSON.stringify(initialValues));
    setShow(false);
  }, []);

  useImperativeHandle(ref, () => ({ show: showModal, hide: hideModal }), [
    hideModal,
    showModal,
  ]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 items-center flex justify-center bg-[rgba(0,0,0,0.5)]">
      <div className="w-[90%] max-w-[500px] overflow-auto max-h-[85%] shadow-xl bg-white rounded-[16px] border border-gray-100">
        {/* Header with venue name */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <button onClick={hideModal} className="p-1 hover:bg-gray-100 rounded-full">
            <X size={24} className="text-gray-600" />
          </button>
          <h1 className="text-lg font-semibold text-gray-800">
            {placeInfo?.name} Form
          </h1>
          <div className="w-8" /> {/* Spacer for centering */}
        </div>

        {/* Card content */}
        <div className="p-5">
          {/* Section title - cyan color like mobile */}
          <p className="text-xl text-center font-bold text-secondary tracking-wide mb-4">
            {titles[activeStep]}
          </p>

          {/* Progress bar - yellow like mobile */}
          <div className="relative w-full mb-6">
            <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary rounded-full"
                animate={{ width: `${progressWidth}%` }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                }}
              />
            </div>
          </div>

          {/* Form content */}
          <div className="min-h-[300px]">
            {activeStep === 0 && (
              <Step0
                initialValues={valuesRef}
                nextStep={nextStep}
                mapathons={data?.results ?? []}
              />
            )}
            {activeStep === 1 && (
              <Step1
                preStep={preStep}
                mapathons={data?.results ?? []}
                initialValues={valuesRef}
                nextStep={nextStep}
              />
            )}
            {activeStep === 2 && (
              <Step2
                initialValues={valuesRef}
                preStep={preStep}
                nextStep={nextStep}
              />
            )}
            {activeStep === 3 && (
              <Step3
                initialValues={valuesRef}
                preStep={preStep}
                nextStep={nextStep}
              />
            )}
            {activeStep === 4 && (
              <Step4
                initialValues={valuesRef}
                preStep={preStep}
                submit={onPressSubmit}
                loading={loading}
                placeId={placeInfo.placeId}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateReview;
