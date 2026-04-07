import React, { Fragment, useState } from "react";
import Questions from "./Questions";
import { step1ValuesInterface, createReviewValuesInterface } from "./interface";
import { useTranslation } from "react-i18next";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
  preStep: () => void;
}

const step1values: step1ValuesInterface = {
  steps: null,
  has1Step: null,
  has2Step: null,
  hasWideEntrance: null,
  hasPermanentRamp: null,
};

const Step1: React.FC<Props> = ({ preStep, initialValues, nextStep }) => {
  const { t } = useTranslation();
  const [values, setValues] = useState<step1ValuesInterface>({
    ...step1values,
    ...initialValues.current.step1,
  });

  const onPressNext = () => {
    initialValues.current = { ...initialValues.current, step1: { ...values } };
    nextStep();
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex-1 overflow-y-auto">
        <Questions
          title="Is there a step?"
          value={values.steps}
          onChange={(e) =>
            setValues((prev) => ({
              ...prev,
              steps: e,
              hasPermanentRamp: !e ? false : null,
              has1Step: null,
              has2Step: null,
            }))
          }
        />

        {values.steps && (
          <Fragment>
            <Questions
              title="1+ Steps?"
              value={values.has1Step}
              onChange={(e) =>
                setValues((prev) => ({
                  ...prev,
                  has1Step: e,
                }))
              }
            />
            {values.has1Step && (
              <Questions
                title="2+ Steps?"
                value={values.has2Step}
                onChange={(e) => setValues((prev) => ({ ...prev, has2Step: e }))}
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

        <Questions
          title="Is there a wide entry?"
          value={values.hasWideEntrance}
          onChange={(e) => setValues((prev) => ({ ...prev, hasWideEntrance: e }))}
        />
      </div>
      <div className="flex justify-end mt-6">
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

export default Step1;
