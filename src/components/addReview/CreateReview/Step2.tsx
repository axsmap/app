import React, { Fragment, useState } from "react";
import Questions from "./Questions";
import { createReviewValuesInterface, step2ValuesInterface } from "./interface";
import { useTranslation } from "react-i18next";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  preStep: () => void;
}

const step2values: step2ValuesInterface = {
  multipleFloors: null,
  hasAccessibleElevator: null,
  hasPortableRamp: null,
  hasWellLit: null,
  brightLightTitle: null,
};

const Step2: React.FC<Props> = ({ initialValues, preStep, nextStep }) => {
  const { t } = useTranslation();
  const [values, setValues] = useState<step2ValuesInterface>({
    ...step2values,
    ...initialValues.current.step2,
  });

  const onPressNext = () => {
    initialValues.current = { ...initialValues.current, step2: { ...values } };
    nextStep && nextStep();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1 overflow-y-auto">
        <Questions
          title="Are there multiple floors?"
          value={values.multipleFloors}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              multipleFloors: e,
              hasAccessibleElevator: null,
              hasPortableRamp: null,
            }))
          }
        />

        {values.multipleFloors === true && (
          <Fragment>
            <Questions
              title="Is there an elevator?"
              value={values.hasAccessibleElevator}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, hasAccessibleElevator: e }))
              }
            />
            <Questions
              title="Is there an Internal Ramp?"
              value={values.hasPortableRamp}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, hasPortableRamp: e }))
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
          onChange={(e) => setValues((prev) => ({ ...prev, brightLightTitle: e }))}
        />
      </div>
      <div className="flex justify-between mt-6">
        <button
          className="px-10 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-full shadow-md transition-all duration-200"
          onClick={preStep}
        >
          {t("back")}
        </button>
        <button
          className="px-10 py-3 bg-primary hover:bg-primary-primary text-gray-800 font-semibold rounded-full shadow-md transition-all duration-200"
          onClick={onPressNext}
        >
          {t("next")}
        </button>
      </div>
    </div>
  );
};

export default Step2;
