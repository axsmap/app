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
}

export interface step3ValuesInterface {
  hasWashroom: null | boolean;
  hasSupportAroundToilet: null | boolean;
  hasLoweredSinks: null | boolean;
}
export interface step4ValuesInterface {
  comment: string;
}

export interface createReviewValuesInterface {
  step1: step1ValuesInterface;
  step2: step2ValuesInterface;
  step3: step3ValuesInterface;
  step4: step4ValuesInterface;
}
