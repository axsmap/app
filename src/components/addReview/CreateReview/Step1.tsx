import React, { Fragment, useState } from "react";
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

const step1values = {
  steps: null,
  has1Step: null,
  has2Step: null,
  hasWideEntrance: null,
  hasParking: null,
  hasSecondEntry: null,
  hasPermanentRamp: null,
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
        <Questions
          title="Is there steps?"
          value={values.steps}
          onChange={(e) => setValues((prev) => ({ ...prev, steps: e }))}
        />
        {values.steps && (
          <Fragment>
            <Questions
              title="One Step"
              value={values.has1Step}
              onChange={(e) => setValues((prev) => ({ ...prev, has1Step: e }))}
            />
            {values.has1Step && (
              <Questions
                title="Two steps or More"
                value={values.has2Step}
                onChange={(e) =>
                  setValues((prev) => ({ ...prev, has2Step: e }))
                }
              />
            )}
          </Fragment>
        )}

        {values.steps && (
          <Questions
            title="Is there a ramp?"
            value={values.hasPermanentRamp}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, hasPermanentRamp: e }))
            }
          />
        )}
        {/* {!values?.hasWideEntrance && values?.hasWideEntrance !== null && ( */}
          <Questions
            title="Is there a wide entry?"
            value={values.hasWideEntrance}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, hasWideEntrance: e }))
            }
          />
        {/* )} */}
        {values.hasWideEntrance && (
          <Questions
            title="Is there a second entrance?"
            value={values.hasSecondEntry}
            onChange={(e) =>
              setValues((prev) => ({ ...prev, hasSecondEntry: e }))
            }
          />
        )}

        <Questions
          title="Is there an accessible parking?"
          value={values.hasParking}
          onChange={(e) => setValues((prev) => ({ ...prev, hasParking: e }))}
        />
      </div>
      <div className="flex mt-5 gap-x-4">
        <button
          className="w-full bg-gray-300 rounded-[8px] py-3"
          onClick={preStep}
        >
          Back
        </button>
        <button
          className="w-full bg-primary rounded-[8px] py-3"
          onClick={onPressNext}
        >
          Next
        </button>
      </div>
      {/* <div className="flex mt-5">
        <div />
        <button
          className="w-full bg-primary rounded-[8px] py-3"
          onClick={onPressNext}
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default Step1;
