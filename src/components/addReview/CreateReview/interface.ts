export interface step1ValuesInterface {
  steps: boolean | null;
  has1Step: boolean | null;
  has2Step: boolean | null;
  hasWideEntrance: boolean | null;
  hasParking: boolean | null;
  hasSecondEntry: boolean | null;
  hasPermanentRamp: null | boolean;
}
export interface step2ValuesInterface {
  multipleFloors: null | boolean;
  hasAccessibleElevator: null | boolean;
  hasWellLit: null | boolean;
  brightLightTitle: null | boolean;
  hasPortableRamp: null | boolean;
}

export interface step3ValuesInterface {
  hasWashroom: null | boolean;
  hasSupportAroundToilet: null | boolean;
  hasLoweredSinks: null | boolean;
  hasWheelchairParking: null | boolean;
}
export interface step4ValuesInterface {
  comment: string;
}

export interface createReviewValuesInterface {
  step0: { event: null | string };
  step1: step1ValuesInterface;
  step2: step2ValuesInterface;
  step3: step3ValuesInterface;
  step4: step4ValuesInterface;
}

export const initialValues: createReviewValuesInterface = {
  step0: {
    event: null,
  },
  step1: {
    steps: null,
    has1Step: null,
    has2Step: null,
    hasWideEntrance: null,
    hasParking: null,
    hasSecondEntry: null,
    hasPermanentRamp: null,
  },
  step2: {
    multipleFloors: null,
    hasAccessibleElevator: null,
    hasWellLit: null,
    brightLightTitle: null,
    hasPortableRamp: null,
  },
  step3: {
    hasLoweredSinks: null,
    hasSupportAroundToilet: null,
    hasWashroom: null,
    hasWheelchairParking: null,
  },
  step4: {
    comment: "",
  },
};
