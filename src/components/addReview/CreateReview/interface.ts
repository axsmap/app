// EXTERIOR - Entrance accessibility questions (matches mobile app)
export interface step1ValuesInterface {
  has0Steps: boolean | null;       // No steps at entrance
  hasPermanentRamp: boolean | null; // Permanent ramp available
  hasPortableRamp: boolean | null;  // Portable ramp available
  has1Step: boolean | null;         // Has 1 step
  has2Steps: boolean | null;        // Has 2+ steps
  hasParking: boolean | null;       // Accessible parking available
  hasSecondEntry: boolean | null;   // Secondary entrance available
  hasWideEntrance: boolean | null;  // Wide entrance (32"+ doorway)
}

// INTERIOR - Interior accessibility questions (matches mobile app)
export interface step2ValuesInterface {
  hasInteriorRamp: boolean | null;      // Interior ramp available
  hasAccessibleElevator: boolean | null; // Accessible elevator available
  hasWellLit: boolean | null;           // Well lit interior
  isQuiet: boolean | null;              // Quiet environment
  isSpacious: boolean | null;           // Spacious interior
  allowsGuideDog: boolean | null;       // Service dogs allowed
}

// RESTROOM - Restroom accessibility questions (matches mobile app)
export interface step3ValuesInterface {
  hasSwingOutDoor: boolean | null;      // Door swings outward
  hasLargeStall: boolean | null;        // Large/accessible stall
  hasSupportAroundToilet: boolean | null; // Grab bars around toilet
  hasLoweredSinks: boolean | null;      // Lowered/accessible sinks
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
    has0Steps: null,
    hasPermanentRamp: null,
    hasPortableRamp: null,
    has1Step: null,
    has2Steps: null,
    hasParking: null,
    hasSecondEntry: null,
    hasWideEntrance: null,
  },
  step2: {
    hasInteriorRamp: null,
    hasAccessibleElevator: null,
    hasWellLit: null,
    isQuiet: null,
    isSpacious: null,
    allowsGuideDog: null,
  },
  step3: {
    hasSwingOutDoor: null,
    hasLargeStall: null,
    hasSupportAroundToilet: null,
    hasLoweredSinks: null,
  },
  step4: {
    comment: "",
  },
};
