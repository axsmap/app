import React, { useState } from "react";
import Questions from "./Questions";
import { createReviewValuesInterface, step2ValuesInterface } from "./interface";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  preStep: () => void;
}

const step1values = {
  multipleFloors: null,
  hasAccessibleElevator: null,
  hasWellLit: null,
  brightLightTitle: null,
};

const Step2: React.FC<Props> = ({ initialValues, preStep, nextStep }) => {
  const [values, setValues] = useState<step2ValuesInterface>({
    ...step1values,
    ...initialValues.current.step2,
  });

  const onPressNext = () => {
    initialValues.current = { ...initialValues.current, step2: { ...values } };
    nextStep && nextStep();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1">
        <Questions
          title="Does this place have multiple floors?"
          value={values.multipleFloors}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, multipleFloors: e }))
          }
        />

        {values.multipleFloors && (
          <Questions
            title="Is there an elevator & internal ramp?"
            value={values.hasAccessibleElevator}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, hasAccessibleElevator: e }))
            }
          />
        )}
        <Questions
          title="Well Lit"
          value={values.hasWellLit}
          onChange={(e) => setValues((prev) => ({ ...prev, hasWellLit: e }))}
        />
        <Questions
          title="Flash Lights"
          value={values.brightLightTitle}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, brightLightTitle: e }))
          }
        />
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
          className="bg-blue-500 text-white px-9 py-2 rounded-md"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Step2;
