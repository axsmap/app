import React, { useState } from "react";
import Questions from "./Questions";
import { createReviewValuesInterface, step2ValuesInterface } from "./interface";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  preStep: () => void;
}

const step2values: step2ValuesInterface = {
  hasInteriorRamp: null,
  hasAccessibleElevator: null,
  hasWellLit: null,
  isQuiet: null,
  isSpacious: null,
  allowsGuideDog: null,
};

const Step2: React.FC<Props> = ({ initialValues, preStep, nextStep }) => {
  const [values, setValues] = useState<step2ValuesInterface>({
    ...step2values,
    ...initialValues.current.step2,
  });

  const onPressNext = () => {
    initialValues.current = { ...initialValues.current, step2: { ...values } };
    nextStep && nextStep();
  };

  return (
    <div className="">
      <div className="">
        <Questions
          title="Is there an interior ramp?"
          value={values.hasInteriorRamp}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasInteriorRamp: e }))
          }
        />

        <Questions
          title="Is there an accessible elevator?"
          value={values.hasAccessibleElevator}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasAccessibleElevator: e }))
          }
        />

        <Questions
          title="Is the interior well lit?"
          value={values.hasWellLit}
          onChange={(e) => setValues((prev) => ({ ...prev, hasWellLit: e }))}
        />

        <Questions
          title="Is the environment quiet?"
          value={values.isQuiet}
          onChange={(e) => setValues((prev) => ({ ...prev, isQuiet: e }))}
        />

        <Questions
          title="Is the interior spacious?"
          value={values.isSpacious}
          onChange={(e) => setValues((prev) => ({ ...prev, isSpacious: e }))}
        />

        <Questions
          title="Are service dogs allowed?"
          value={values.allowsGuideDog}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, allowsGuideDog: e }))
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

export default Step2;
