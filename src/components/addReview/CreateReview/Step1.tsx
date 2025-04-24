import React, { Fragment, useState } from "react";
import Questions from "./Questions";
import { step1ValuesInterface, createReviewValuesInterface } from "./interface";
import styles from "./step1.module.css";

interface Props {
  initialValues: React.RefObject<createReviewValuesInterface>;
  nextStep: () => void;
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

const Step1: React.FC<Props> = ({ initialValues, nextStep }) => {
  const [values, setValues] = useState<step1ValuesInterface>({
    ...step1values,
    ...initialValues.current.step1,
  });

  const onPressNext = () => {
    initialValues.current = { ...initialValues.current, step1: { ...values } };
    nextStep();
  };

  return (
    <div className={styles.root}>
      <div className={styles.questionsContainer}>
        <Questions
          title="Does this location have steps?"
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
            <Questions
              title="Two steps or More than Two steps"
              value={values.has2Step}
              onChange={(e) => setValues((prev) => ({ ...prev, has2Step: e }))}
            />
          </Fragment>
        )}
        <Questions
          title="Does this location have a ramp?"
          value={values.hasPermanentRamp}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasPermanentRamp: e }))
          }
        />
        <Questions
          title="Does this location have a second entrance?"
          value={values.hasSecondEntry}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasSecondEntry: e }))
          }
        />
        <Questions
          title="Does this location have a wide entry?"
          value={values.hasWideEntrance}
          onChange={(e) =>
            setValues((prev) => ({ ...prev, hasWideEntrance: e }))
          }
        />
        <Questions
          title="Does this location have wheelchair accessible parking?"
          value={values.hasParking}
          onChange={(e) => setValues((prev) => ({ ...prev, hasParking: e }))}
        />
      </div>
      <div className={styles.buttonsContainer}>
        <div />
        <button className={styles.nextButton} onClick={onPressNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Step1;
