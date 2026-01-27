"use client";
import {
  useCreateReviewMutation,
  useLazyJoinedMapathonQuery,
} from "@/Services/modules/mapathon";
import { motion } from "framer-motion";
import { X, Mic, PenLine } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
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
import { VoiceReviewFlow } from "@/components/VoiceReview";

type steps = 0 | 1 | 2 | 3 | 4; // 0 is now the choice screen

type ReviewMode = "choice" | "manual" | "voice";

interface CreateReviewProps {
  handleRefetch: () => void;
}

const CreateReview = forwardRef<createReviewHandler, {}>(({}, ref) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [placeInfo, setPlaceInfo] = useState({ placeId: "", name: "" });
  const token = useAppSelector((state) => state.token?.token);

  const [allJoinMapathins, { isLoading, data }] = useLazyJoinedMapathonQuery();

  const router = useRouter();
  const [activeStep, setActiveStep] = useState<steps>(1);
  const [reviewMode, setReviewMode] = useState<ReviewMode>("choice");
  const [createReview, { isLoading: loading }] = useCreateReviewMutation();

  const valuesRef = useRef<createReviewValuesInterface>(
    JSON.parse(JSON.stringify(initialValues))
  );

  // Get section title based on active step
  const getSectionTitle = (step: steps): string => {
    const titles: Record<steps, string> = {
      0: t("voiceReview.reviewTitle", "Review"),
      1: t("sectionEntrance"),   // ENTRANCE
      2: t("sectionInterior"),   // INTERIOR
      3: t("sectionRestroom"),   // RESTROOM
      4: t("sectionComment"),    // COMMENT
    };
    return titles[step];
  };

  const nextStep = useCallback(() => {
    console.log("next");
    setActiveStep((prev) => (prev < 4 ? ((prev + 1) as steps) : prev));
  }, []);

  const preStep = useCallback(() => {
    // If at step 1 and in manual mode, go back to choice screen
    if (activeStep === 1 && reviewMode === "manual") {
      setReviewMode("choice");
      return;
    }
    setActiveStep((prev) => (prev > 1 ? ((prev - 1) as steps) : prev));
  }, [activeStep, reviewMode]);

  // Handle selecting manual review mode
  const handleSelectManual = useCallback(() => {
    setReviewMode("manual");
    setActiveStep(1);
  }, []);

  // Handle selecting voice review mode
  const handleSelectVoice = useCallback(() => {
    setReviewMode("voice");
  }, []);

  // Handle voice review success - redirect to thank you page
  const handleVoiceReviewSuccess = useCallback((reviewId: string) => {
    hideModal();
    router.push(`/thank-you?venue=${reviewId}`);
  }, [router]);

  useEffect(() => {
    if (token) {
      allJoinMapathins({});
    }
  }, [token]);

  // Auto-select first joined mapathon (like mobile) and skip Step0
  useEffect(() => {
    if (data?.results && data?.results?.length > 0) {
      // Auto-assign the first mapathon (user's active mapathon)
      valuesRef.current.step0.event = data.results[0].id;
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
          comments: comment,
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

  const progressWidth = reviewMode === "manual" ? ((activeStep - 1) / 3) * 90 + 10 : 0;

  const showModal = useCallback(
    (e: createReview) => {
      setPlaceInfo({ name: e.name, placeId: e.placeId });
      // Auto-select first joined mapathon (like mobile)
      if (data?.results && data?.results?.length > 0) {
        valuesRef.current.step0.event = data.results[0].id;
      }
      // Start at choice screen
      setReviewMode("choice");
      setActiveStep(1);
      setShow(true);
    },
    [data]
  );
  const hideModal = useCallback(() => {
    setActiveStep(1);
    setReviewMode("choice");
    valuesRef.current = JSON.parse(JSON.stringify(initialValues));
    setShow(false);
  }, []);

  useImperativeHandle(ref, () => ({ show: showModal, hide: hideModal }), [
    hideModal,
    showModal,
  ]);

  if (!show) return null;

  // Voice Review Mode
  if (reviewMode === "voice") {
    return (
      <div className="fixed inset-0 z-50 items-center flex justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="w-[90%] max-w-[500px] overflow-auto max-h-[85%] shadow-xl bg-white rounded-[16px] border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <button 
              onClick={() => setReviewMode("choice")} 
              className="p-1 hover:bg-gray-100 rounded-full"
              aria-label={t("voiceReview.close")}
            >
              <X size={24} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              {placeInfo?.name}
            </h1>
            <div className="w-8" />
          </div>

          {/* Voice Review Flow */}
          <div className="p-5">
            <VoiceReviewFlow
              placeId={placeInfo.placeId}
              placeName={placeInfo.name}
              token={token || ""}
              onSuccess={handleVoiceReviewSuccess}
              onCancel={() => setReviewMode("choice")}
            />
          </div>
        </div>
      </div>
    );
  }

  // Choice Screen - Select Voice or Manual
  if (reviewMode === "choice") {
    return (
      <div className="fixed inset-0 z-50 items-center flex justify-center bg-[rgba(0,0,0,0.5)]">
        <div className="w-[90%] max-w-[500px] overflow-auto max-h-[85%] shadow-xl bg-white rounded-[16px] border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <button onClick={hideModal} className="p-1 hover:bg-gray-100 rounded-full">
              <X size={24} className="text-gray-600" />
            </button>
            <h1 className="text-lg font-semibold text-gray-800">
              {placeInfo?.name}
            </h1>
            <div className="w-8" />
          </div>

          {/* Choice Content */}
          <div className="p-6">
            <p className="text-xl text-center font-bold text-secondary tracking-wide mb-2">
              {t("voiceReview.reviewTitle", "Add Review")}
            </p>
            <p className="text-center text-gray-500 text-sm mb-6">
              {t("voiceReview.instructions", "Choose how you'd like to review this location")}
            </p>

            <div className="space-y-4">
              {/* Voice Review Option */}
              <button
                onClick={handleSelectVoice}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-secondary hover:bg-secondary/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                  <Mic size={28} className="text-secondary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {t("voiceReview.startRecording", "Voice Review")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t("voiceReview.speakHint", "Speak and we'll fill out the form for you")}
                  </p>
                </div>
              </button>

              {/* Manual Review Option */}
              <button
                onClick={handleSelectManual}
                className="w-full flex items-center gap-4 p-4 border-2 border-gray-200 rounded-xl hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <PenLine size={28} className="text-primary" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-semibold text-gray-800 text-lg">
                    {t("voiceReview.fillManually", "Fill Out Form")}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {t("voiceReview.preferTyping", "Answer questions step by step")}
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Manual Review Mode (existing flow)
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
            {getSectionTitle(activeStep)}
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
            {activeStep === 1 && (
              <Step1
                preStep={preStep}
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
