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
  hasParking: boolean | null;       // Is there accessible parking?
  hasSecondEntry: boolean | null;   // Is there a second entrance?
  hasPermanentRamp: boolean | null; // Is there a ramp?
}

// INTERIOR - Interior accessibility questions (matches mobile app exactly)
export interface step2ValuesInterface {
  multipleFloors: boolean | null;        // Are there multiple floors?
  hasAccessibleElevator: boolean | null; // Is there an elevator?
  hasPortableRamp: boolean | null;       // Is there an Internal Ramp?
  hasWellLit: boolean | null;            // Well lit?
  brightLightTitle: boolean | null;      // Flashing lights?
}

// RESTROOM - Restroom accessibility questions (matches mobile app exactly)
export interface step3ValuesInterface {
  hasWashroom: boolean | null;            // Does this place have a bathroom?
  hasWheelchairParking: boolean | null;   // Is there a bathroom or stall that accommodates a wheelchair?
  hasSupportAroundToilet: boolean | null; // Is there a grab bar?
  hasLoweredSinks: boolean | null;        // (kept for API compatibility)
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
    hasParking: null,
    hasSecondEntry: null,
    hasPermanentRamp: null,
  },
  step2: {
    multipleFloors: null,
    hasAccessibleElevator: null,
    hasPortableRamp: null,
    hasWellLit: null,
    brightLightTitle: null,
  },
  step3: {
    hasWashroom: null,
    hasWheelchairParking: null,
    hasSupportAroundToilet: null,
    hasLoweredSinks: null,
  },
  step4: {
    comment: "",
  },
};
