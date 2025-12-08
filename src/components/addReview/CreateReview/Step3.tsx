import React, { useState } from "react";
import Questions from "./Questions";
import { createReviewValuesInterface, step3ValuesInterface } from "./interface";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  preStep: () => void;
}

const step3values: step3ValuesInterface = {
  hasSwingOutDoor: null,
  hasLargeStall: null,
  hasSupportAroundToilet: null,
  hasLoweredSinks: null,
};

const Step3: React.FC<Props> = ({ initialValues, preStep, nextStep }) => {
  const [values, setValues] = useState<step3ValuesInterface>({
    ...step3values,
    ...initialValues.current.step3,
  });

  const onPressNext = () => {
    initialValues.current = { ...initialValues.current, step3: { ...values } };
    nextStep && nextStep();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1">
        <Questions
          title="Does the restroom door swing outward?"
          value={values.hasSwingOutDoor}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasSwingOutDoor: e }))
          }
        />

        <Questions
          title="Is there a large/accessible stall?"
          value={values.hasLargeStall}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasLargeStall: e }))
          }
        />

        <Questions
          title="Are there grab bars around the toilet?"
          value={values.hasSupportAroundToilet}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasSupportAroundToilet: e }))
          }
        />

        <Questions
          title="Are there lowered/accessible sinks?"
          value={values.hasLoweredSinks}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasLoweredSinks: e }))
          }
        />
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="px-10 py-3 bg-primary hover:bg-primary-primary text-gray-800 font-semibold rounded-full shadow-md transition-all duration-200"
          onClick={onPressNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step3;
