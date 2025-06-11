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
    <div className="absolute z-10 items-center flex justify-center bg-[rgba(0,0,0,0.3)] top-0 h-full w-full">
      <div className="w-[40%] overflow-auto max-h-[80%] shadow-lg bg-white rounded-[10px] p-4">
        <div className="mb-4">
          <h1 className="text-xl text-primary-normal font-semibold text-center">
            {placeInfo?.name}
          </h1>
        </div>
        <div className="bg-white">
          <div className="relative items-center">
            <p className="text-lg text-center font-semibold text-secondary">
              {titles[activeStep]}
            </p>
            <X onClick={hideModal} className="absolute top-0 right-0" />
          </div>

          <div className="relative w-full mb-3 mt-3">
            <div
              className="absolute top-0 left-0 h-2 bg-gray-300 rounded-lg"
              style={{ width: "100%", height: "10px" }}
            />
            <motion.div
              className="absolute top-0 left-0 h-2 bg-primary-primary rounded-lg"
              animate={{ width: `${progressWidth}%` }}
              transition={{
                type: "spring",
                stiffness: 100,
                damping: 20,
              }}
              style={{ height: "10px" }}
            />
          </div>

          <div className="px-4 pt-3 h-full overflow-y-auto">
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
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
});

export default CreateReview;
