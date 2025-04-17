import React, { useState, ChangeEvent } from "react";
import Image from "next/image";
import CloseMenuIcon from "@/assets/icons/close-menu-icon";
import CustomInput from "../ui/custom-input/custom-input";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";

interface Step {
  image: string;
  title: string;
  description: string;
  isFinalStep?: boolean;
}

interface ModalProps {
  isModalOpen: boolean;
  onClose: () => void;
  stepsData: {
    image: string;
    title: string;
    description: string;
    isFinalStep?: boolean | undefined;
  };
}

const StepperComponent: React.FC<ModalProps> = ({
  isModalOpen,
  onClose,
  stepsData,
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    description: "",
    steps: stepsData?.map((step, index) => ({
      stepIndex: index,
      title: step.title,
      description: step.description,
    })),
  });

  const [selectedButton, setSelectedButton] = useState<string | null>(null);

  const currentStepsData = stepsData?.[currentStep];

  if (!isModalOpen) return null;

  const isFinalStep = currentStep === stepsData.length - 1;

  const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      description: e.target.value,
    }));
  };

  const handleNextStep = () => {
    setSelectedButton(null);
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    setSelectedButton(null);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleYesClick = () => {
    setSelectedButton("yes");
    console.log("Yes clicked");
  };

  const handleNoClick = () => {
    setSelectedButton("no");
    console.log("No clicked");
  };

  const handleSubmitReview = () => {
    console.log("FormData", formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="w-[450px] bg-white rounded-xl border border-[#D9DADF] shadow-lg p-6 flex flex-col items-center gap-4 relative">
        <div className="flex justify-between items-center w-full">
          <span className="text-sm text-gray-500">
            Step {currentStep + 1} of {stepsData.length}
          </span>
          <div className="text-gray-500 hover:text-gray-800" onClick={onClose}>
            <CloseMenuIcon />
          </div>
        </div>

        {!isFinalStep && (
          <>
            <Image
              src={currentStepsData?.image || ""}
              width={150}
              height={150}
              alt="Modal Image"
              className="w-[187px] h-[138px] object-cover"
            />
            <h2 className="text-[24px] font-semibold text-black text-center">
              {currentStepsData?.title}
            </h2>
            <p className="text-[16px] text-[#5D606D] text-center">
              {currentStepsData?.description ||
                "Description of the step if any."}
            </p>
          </>
        )}

        {isFinalStep && (
          <div className="w-full">
            <CustomInput
              name="description"
              label="Comments"
              value={formData.description}
              placeholder="Enter your comments"
              multiline
              onChange={handleReviewChange}
            />
            <button
              onClick={handleSubmitReview}
              className="btn-primary w-full mt-4 py-2"
            >
              Submit Review
            </button>
          </div>
        )}

        {!isFinalStep && (
          <div className="flex gap-4">
            <button
              className={`w-[120px] py-2 ${
                selectedButton === "no"
                  ? "bg-yellow-500 text-gray-800"
                  : "bg-gray-300 text-gray-800"
              }`}
              onClick={handleNoClick}
            >
              No
            </button>
            <button
              className={`w-[120px] py-2 ${
                selectedButton === "yes"
                  ? "bg-yellow-500 text-gray-800"
                  : "bg-gray-300 text-gray-800"
              }`}
              onClick={handleYesClick}
            >
              Yes
            </button>
          </div>
        )}

        {!isFinalStep && (
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex justify-between w-full px-4">
            <button
              onClick={handlePreviousStep}
              className="flex justify-center items-center w-4 h-4"
            >
              <ArrowLeftIcon />
            </button>
            <button
              onClick={handleNextStep}
              className="flex justify-center items-center w-4 h-4"
            >
              <ArrowRightIcon />
            </button>
          </div>
        )}

        {!isFinalStep && (
          <button
            className="text-[#787879] text-[16px] font-medium mt-2"
            onClick={handleNextStep}
          >
            Skip
          </button>
        )}
      </div>
    </div>
  );
};

export default StepperComponent;
