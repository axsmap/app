import React, { useState } from "react";
import Questions from "./Questions";
import { step1ValuesInterface, createReviewValuesInterface } from "./interface";
import styles from "./step1.module.css";
import { mapathon } from "@/Services/modules/mapathon/joinedMapathons";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  preStep: () => void;
  mapathons: mapathon[];
}

const step1values: step1ValuesInterface = {
  has0Steps: null,
  hasPermanentRamp: null,
  hasPortableRamp: null,
  has1Step: null,
  has2Steps: null,
  hasParking: null,
  hasSecondEntry: null,
  hasWideEntrance: null,
};

const Step1: React.FC<Props> = ({ preStep, initialValues, nextStep }) => {
  const [values, setValues] = useState<step1ValuesInterface>({
    ...step1values,
    ...initialValues.current.step1,
  });

  const onPressNext = () => {
    initialValues.current = { ...initialValues.current, step1: { ...values } };
    nextStep();
  };

  return (
    <div className="">
      <div className="overflow-y-auto">
        {/* Steps questions - matching mobile app flow */}
        <Questions
          title="Is there a step?"
          value={values.has0Steps === false ? true : values.has0Steps === true ? false : null}
          onChange={(e) => {
            // If "Yes" there is a step, has0Steps = false (not zero steps)
            // If "No" there is no step, has0Steps = true (zero steps)
            const has0Steps = e === true ? false : e === false ? true : null;
            setValues((prev) => ({ 
              ...prev, 
              has0Steps,
              // Reset step-related fields when this changes
              has1Step: has0Steps === true ? null : prev.has1Step,
              has2Steps: has0Steps === true ? null : prev.has2Steps,
              hasPermanentRamp: has0Steps === true ? null : prev.hasPermanentRamp,
              hasPortableRamp: has0Steps === true ? null : prev.hasPortableRamp,
            }));
          }}
        />

        {/* Show step count options only if there ARE steps */}
        {values.has0Steps === false && (
          <>
            <Questions
              title="1+ Steps?"
              value={values.has1Step}
              onChange={(e) => setValues((prev) => ({ ...prev, has1Step: e }))}
            />
            {values.has1Step && (
              <Questions
                title="2+ Steps?"
                value={values.has2Steps}
                onChange={(e) => setValues((prev) => ({ ...prev, has2Steps: e }))}
              />
            )}
            <Questions
              title="Is there a ramp?"
              value={values.hasPermanentRamp || values.hasPortableRamp}
              onChange={(e) => {
                if (e) {
                  // If yes, set permanent ramp as default
                  setValues((prev) => ({ ...prev, hasPermanentRamp: true, hasPortableRamp: null }));
                } else {
                  setValues((prev) => ({ ...prev, hasPermanentRamp: e, hasPortableRamp: null }));
                }
              }}
            />
          </>
        )}

        <Questions
          title="Is there a wide entry?"
          value={values.hasWideEntrance}
          onChange={(e) => setValues((prev) => ({ ...prev, hasWideEntrance: e }))}
        />

        {values.hasWideEntrance === false && (
          <Questions
            title="Is there a second entrance?"
            value={values.hasSecondEntry}
            onChange={(e) => setValues((prev) => ({ ...prev, hasSecondEntry: e }))}
          />
        )}

        <Questions
          title="Is there accessible parking?"
          value={values.hasParking}
          onChange={(e) => setValues((prev) => ({ ...prev, hasParking: e }))}
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

export default Step1;
