"use client";
import React, { useState } from "react";
import CardComponent from "@/components/Card";
import image1 from "@/assets/images/image1.png";
import Map from "@/components/Map";
import CustomModal from "@/components/custom-modal/custom-modal";
import { stepsData } from "@/utils/constants";

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [responses, setResponses] = useState<boolean[]>([]);
  const [reviewText, setReviewText] = useState("");

  const handleButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  const handleNextStep = () => {
    if (currentStep < stepsData.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleYesClick = () => {
    setResponses((prevResponses) => [...prevResponses, true]);
  };

  const handleNoClick = () => {
    setResponses((prevResponses) => [...prevResponses, false]);
  };

  const handleSubmitReview = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col lg:flex-row p-4">
      <div className="lg:w-2/3 bg-white p-4 rounded-lg ">
        <Map />
      </div>
      <div className="lg:w-1/3 bg-white p-4 rounded-lg ">
        <CardComponent
          imageSrc={image1}
          title="Smart Tech"
          description="This venue has no ratings"
          buttonText="Add Review"
          onButtonClick={handleButtonClick}
        />
      </div>

      <CustomModal
        isOpen={isModalOpen}
        onClose={handleClose}
        onNextStep={handleNextStep}
        onPreviousStep={handlePreviousStep}
        stepText={`Step ${currentStep + 1} of ${stepsData.length}`}
        imageSrc={stepsData[currentStep].image}
        title={stepsData[currentStep].title}
        description={stepsData[currentStep].description}
        isFinalStep={stepsData[currentStep].isFinalStep || false}
        onYes={handleYesClick}
        onNo={handleNoClick}
        setReviewText={setReviewText}
        reviewText={reviewText}
        onSubmitReview={handleSubmitReview}
      />
    </div>
  );
};

export default Home;
