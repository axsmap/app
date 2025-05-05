import React, { useState } from "react";
import Questions from "./Questions";
import { createReviewValuesInterface, step3ValuesInterface } from "./interface";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  preStep: () => void;
}

const step2values = {
  hasWashroom: null,
  hasSupportAroundToilet: null,
  hasLoweredSinks: null,
};

const Step3: React.FC<Props> = ({ initialValues, preStep, nextStep }) => {
  const [values, setValues] = useState<step3ValuesInterface>({
    ...step2values,
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
          title="Does this place have a bathroom?"
          value={values.hasWashroom}
          onChange={(e) => setValues((prev) => ({ ...prev, hasWashroom: e }))}
        />
        {values.hasWashroom && (
          <>
            <Questions
              title="Are lowered sinks available?"
              value={values.hasLoweredSinks}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, hasLoweredSinks: e }))
              }
            />
            <Questions
              title="Is there a bathroom or stall that accommodates a wheelchair?"
              value={values.hasSupportAroundToilet}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, hasSupportAroundToilet: e }))
              }
            />
          </>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={preStep}
          className="bg-gray-300 text-black px-9 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={onPressNext}
          className="bg-yellow-500 text-white px-9 py-2 rounded-md"
        >
          Next
        </button>
      </div>
      {/* <div className="flex justify-between mt-4">
        <button
          onClick={preStep}
          className="bg-gray-300 text-black px-9 py-2 rounded-md"
        >
          Back
        </button>
        <button
          onClick={onPressNext}
          className="bg-yellow-500 text-white px-9 py-2 rounded-md"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Step3;
