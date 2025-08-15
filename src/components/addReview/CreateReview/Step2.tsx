import React, { Fragment, useState } from "react";
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
    <div className="">
      <div className="">
        <Questions
          title="Are there multiple floors?"
          value={values.multipleFloors}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, multipleFloors: e }))
          }
        />

        {values.multipleFloors && (
          <Fragment>
            <Questions
              title="Is there an elevator?"
              value={values.hasAccessibleElevator}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, hasAccessibleElevator: e }))
              }
            />
            <Questions
              title="Is there an internal ramp?"
              value={values.hasPortableRamp}
              onChange={(e) =>
                setValues((pre) => ({ ...pre, hasPortableRamp: e }))
              }
            />
          </Fragment>
        )}
        <Questions
          title="Well lit?"
          value={values.hasWellLit}
          onChange={(e) => setValues((prev) => ({ ...prev, hasWellLit: e }))}
        />
        <Questions
          title="Flashing lights?"
          value={values.brightLightTitle}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, brightLightTitle: e }))
          }
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
    </div>
  );
};

export default Step2;
