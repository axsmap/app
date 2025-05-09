"use client";
import { useState } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { useCreateMapathonSurveyMutation } from "@/Services/modules/mapathon";
import { showAuthModal } from "../AuthModal/handleAuthModal";
import { useToast } from "../context/toast-context";
import { AiOutlineLoading3Quarters, AiOutlineClose } from "react-icons/ai";

interface SurveyModalProps {
  setIsSurveyOpen: (isOpen: boolean) => void;
}
const SurveyModal = ({ setIsSurveyOpen }: SurveyModalProps) => {
  const { showToast } = useToast();
  const [answers, setAnswers] = useState({
    features: "",
    navigationEase: "",
    motivation: "",
    accessibility: "",
    additionalFeatures: "",
    satisfaction: "",
    challenges: "",
    recommend: "",
    frequency: "",
  });

  const [surveyData, { isLoading }] = useCreateMapathonSurveyMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await surveyData(answers).unwrap();
      showToast(response.message, "success");
      setAnswers({
        features: "",
        navigationEase: "",
        motivation: "",
        accessibility: "",
        additionalFeatures: "",
        satisfaction: "",
        challenges: "",
        recommend: "",
        frequency: "",
      });
      setIsSurveyOpen(false);
    } catch (error) {
      showToast("Error submitting survey", "error");
    }
  };

  const handleClose = () => {
    setIsSurveyOpen(false);
  };

  return (
    <div className="p-6  max-w-md mx-auto overflow-y-auto max-h-[70vh] relative">
      <button
        onClick={handleClose}
        className="absolute top-2 right-2 text-xl text-gray-600 hover:text-gray-800"
      >
        <AiOutlineClose />
      </button>

      <h3 className="text-xl font-semibold mb-2">AXS Map Survey</h3>
      <p className="text-gray-700 mb-4">
        We would love to hear your thoughts and feedback on the AXS Map app.
        Please take a moment to answer the following questions.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CustomInput
            label="What features do you use most on AXS Map?"
            type="text"
            name="features"
            value={answers.features}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="How easy is it to navigate the app?"
            type="text"
            name="navigationEase"
            value={answers.navigationEase}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="What motivates you to participate in Mapathons?"
            type="text"
            name="motivation"
            value={answers.motivation}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="How can we improve accessibility ratings?"
            type="text"
            name="accessibility"
            value={answers.accessibility}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="Any additional features you'd like to see?"
            type="text"
            name="additionalFeatures"
            value={answers.additionalFeatures}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="How satisfied are you with the app?"
            type="text"
            name="satisfaction"
            value={answers.satisfaction}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="What challenges have you faced using AXS Map?"
            type="text"
            name="challenges"
            value={answers.challenges}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="Would you recommend it to others?"
            type="text"
            name="recommend"
            value={answers.recommend}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label="What would make you use it more often?"
            type="text"
            name="frequency"
            value={answers.frequency}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex gap-4 justify-between">
          <button
            type="button"
            onClick={handleClose}
            className="bg-gray-300 text-white py-2 px-4 rounded-lg w-full"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-yellow-500 text-white py-2 px-4 rounded-lg w-full"
          >
            <div className="flex items-center justify-center gap-2">
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin" />
              ) : (
                "Submit Survey"
              )}
            </div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SurveyModal;
