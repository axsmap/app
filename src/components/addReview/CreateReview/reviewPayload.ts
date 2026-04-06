import { createReviewValuesInterface } from "./interface";

type ReviewPayloadValue = boolean | number | string;
type ReviewPayloadDraftValue = ReviewPayloadValue | null | undefined;

const deriveStepsValue = (step1: createReviewValuesInterface["step1"]) => {
  if (step1.steps === false) return 0;
  if (step1.steps !== true) return null;
  if (step1.has2Step === true) return 2;
  if (step1.has1Step === true) return 1;
  if (step1.has1Step === false) return 3;
  return null;
};

export const buildReviewContractFields = (
  values: createReviewValuesInterface
): Record<string, ReviewPayloadValue> => {
  const steps = deriveStepsValue(values.step1);

  const payload: Record<string, ReviewPayloadDraftValue> = {
    steps,
    has1Step: values.step1.has1Step,
    has2Step: values.step1.has2Step,
    hasPermanentRamp: values.step1.hasPermanentRamp,
    hasWideEntrance: values.step1.hasWideEntrance,
    multipleFloors: values.step2.multipleFloors,
    hasAccessibleElevator: values.step2.hasAccessibleElevator,
    hasWashroom: values.step3.hasWashroom,
    hasLargeStall: values.step3.hasLargeStall,
    hasSupportAroundToilet: values.step3.hasSupportAroundToilet,
  };

  const filteredEntries = Object.entries(payload).filter(
    ([, value]) => value !== null && value !== undefined
  ) as Array<[string, ReviewPayloadValue]>;

  return Object.fromEntries(filteredEntries);
};
