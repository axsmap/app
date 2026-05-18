// Step 0 - Mapathon selection (matches mobile app)
export interface step0ValuesInterface {
  event: string | null;
}

// EXTERIOR - Entrance accessibility questions (matches mobile app exactly)
export interface step1ValuesInterface {
  steps: boolean | null;            // Is there a step?
  has1Step: boolean | null;         // 1+ Steps?
  has2Step: boolean | null;         // 2+ Steps?
  hasWideEntrance: boolean | null;  // Is there a wide entry?
  hasPermanentRamp: boolean | null; // Is there a ramp?
}

// INTERIOR - Interior accessibility questions (matches mobile app exactly)
export interface step2ValuesInterface {
  multipleFloors: boolean | null;        // Are there multiple floors?
  hasAccessibleElevator: boolean | null; // Is there an elevator?
}

// RESTROOM - Restroom accessibility questions (matches mobile app exactly)
export interface step3ValuesInterface {
  hasWashroom: boolean | null;            // Does this place have a bathroom?
  hasLargeStall: boolean | null;          // Is there a stall that accommodates a wheelchair?
  hasSupportAroundToilet: boolean | null; // Is there a grab bar?
}

export interface step4ValuesInterface {
  comment: string;
}

export interface createReviewValuesInterface {
  step0: step0ValuesInterface;
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
    hasPermanentRamp: null,
  },
  step2: {
    multipleFloors: null,
    hasAccessibleElevator: null,
  },
  step3: {
    hasWashroom: null,
    hasLargeStall: null,
    hasSupportAroundToilet: null,
  },
  step4: {
    comment: "",
  },
};
