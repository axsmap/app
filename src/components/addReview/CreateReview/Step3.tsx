import React, { Fragment, useState } from "react";
import Questions from "./Questions";
import { createReviewValuesInterface, step3ValuesInterface } from "./interface";
import { useTranslation } from "react-i18next";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  preStep: () => void;
}

const step3values: step3ValuesInterface = {
  hasWashroom: null,
  hasSupportAroundToilet: null,
  hasLoweredSinks: null,
  hasWheelchairParking: null,
};

const Step3: React.FC<Props> = ({ initialValues, preStep, nextStep }) => {
  const { t } = useTranslation();
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
      <div className="flex-1 overflow-y-auto">
        <Questions
          title="Does this place have a bathroom?"
          value={values.hasWashroom}
          onChange={(e) => setValues((prev) => ({ ...prev, hasWashroom: e }))}
        />

        {values.hasWashroom && (
          <Fragment>
            <Questions
              title="Is there a bathroom or stall that accommodates a wheelchair?"
              value={values.hasWheelchairParking}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, hasWheelchairParking: e }))
              }
            />
            <Questions
              title="Is there a grab bar?"
              value={values.hasSupportAroundToilet}
              onChange={(e) =>
                setValues((prev) => ({ ...prev, hasSupportAroundToilet: e }))
              }
            />
          </Fragment>
        )}
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

export default Step3;
