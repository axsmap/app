import { use, useState } from "react";
import CustomInput from "../ui/custom-input/custom-input";
import { useCreateMapathonSurveyMutation } from "@/Services/modules/mapathon";

const SurveyModal = () => {
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

  const [surveyData] = useCreateMapathonSurveyMutation();
  console.log("Survey data", surveyData);
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Survey submitted", answers);
  };
  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto overflow-y-auto max-h-[70vh]">
      <h3 className="text-xl font-semibold mb-4">AXS Map Survey</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <CustomInput
            label=" What features do you use most on AXS Map?"
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
            label=" What motivates you to participate in Mapathons?"
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
            label=" Would you recommend it to others?"
            type="text"
            name="recommend"
            value={answers.recommend}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <CustomInput
            label=" What would make you use it more often?"
            type="text"
            name="frequency"
            value={answers.frequency}
            onChange={handleInputChange}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-yellow-500 text-white py-2 rounded-lg"
        >
          Submit Survey
        </button>
      </form>
    </div>
  );
};

export default SurveyModal;
