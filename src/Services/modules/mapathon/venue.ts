import { BaseQueryFn, EndpointBuilder } from "@reduxjs/toolkit/query";

export interface AccessibilityFeature {
  yes: number;
  no: number;
}

export interface Steps {
  zero: number;
  one: number;
  two: number;
  moreThanTwo: number;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface venueInterface {
  location: Location;
  distance: string;
  photo: string;
  placeId: string;
  types: string[];
  name: string;
  hasPermanentRamp: AccessibilityFeature;
  hasPortableRamp: AccessibilityFeature;
  hasWideEntrance: AccessibilityFeature;
  hasAccessibleTableHeight: AccessibilityFeature;
  hasAccessibleElevator: AccessibilityFeature;
  hasInteriorRamp: AccessibilityFeature;
  hasSwingInDoor: AccessibilityFeature;
  hasSwingOutDoor: AccessibilityFeature;
  hasLargeStall: AccessibilityFeature;
  hasSupportAroundToilet: AccessibilityFeature;
  hasLoweredSinks: AccessibilityFeature;
  allowsGuideDog: AccessibilityFeature;
  hasParking: AccessibilityFeature;
  hasSecondEntry: AccessibilityFeature;
  hasWellLit: AccessibilityFeature;
  isQuiet: AccessibilityFeature;
  isSpacious: AccessibilityFeature;

  steps: Steps;

  entranceScore: number;
  interiorScore: number;
  restroomScore: number;
  mapMarkerScore: number;
  isReviewed: boolean;

  interiorGlyphs: string;
  restroomGlyphs: string;
  entranceGlyphs: string;
}

type Venues = {
  results: venueInterface[];
};

type Payload = {
  location: string;
  name?: string;
  type?: string;
  page?: string;
  entranceScore?: string;
  interiorScore?: string;
  restroomScore?: string;
  // language: string;
  hasParking?: string;
};

export const venue = (build: EndpointBuilder<BaseQueryFn, string, string>) =>
  build.query<Venues, Payload>({
    query: (payload) => {
      console.log(payload.location)
      let url = `venues?location=${payload.location}`;
      if (payload.name) url += `&name=${payload.name}`;
      if (payload.type) url += `&type=${payload.type}`;
      if (payload.page) url += `&page=${payload.page}`;
      if (payload.entranceScore && payload.entranceScore !== "1") {
        url += `&entranceScore=${payload.entranceScore}`;
      }
      if (payload.interiorScore && payload.interiorScore !== "1") {
        url += `&interiorScore=${payload.interiorScore}`;
      }
      if (payload.restroomScore && payload.restroomScore !== "1") {
        url += `&restroomScore=${payload.restroomScore}`;
      }
      if (payload.hasParking && payload.hasParking !== "any" && payload.hasParking !== "" ) {
        url += `&hasParking=${payload.hasParking}`;
      }
      return {
        url,
      };
    },
  });
