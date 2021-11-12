import {
  CLEAR_STATE,
  SET_LOADING_VENUE,
  SET_VENUE,
  SET_WELCOME_VISIBILITY,
  SET_USES_VISIBILITY,
} from './constants'

const initialState = {
  loadingVenue: true,
  venue: {
    id: '',
    address: '',
    allowsGuideDog: {
      yes: 0,
      no: 0,
    },

    bathroomReviews: 0,
    coverPhoto: '',
    restroomScore: null,
    restroomGlyphs: 'restroom',
    interiorReviews: 0,
    interiorScore: null,
    interiorGlyphs: 'interior',
    entryReviews: 0,
    entranceScore: null,
    entranceGlyphs: 'entrylg',
    mapMarkerScore: 0,
    googleRating: null,
    googleUrl: '',
    hasParking: {
      yes: 0,
      no: 0,
    },
    hasPermanentRamp: {
      yes: 0,
      no: 0,
    },
    hasPortableRamp: {
      yes: 0,
      no: 0,
    },
    has0Steps: {
      yes: 0,
      no: 0,
    },
    has1Step: {
      yes: 0,
      no: 0,
    },
    has2Steps: {
      yes: 0,
      no: 0,
    },
    hasWideEntrance: {
      yes: 0,
      no: 0,
    },
    hasAccessibleTableHeight: {
      yes: 0,
      no: 0,
    },
    hasAccessibleElevator: {
      yes: 0,
      no: 0,
    },
    hasInteriorRamp: {
      yes: 0,
      no: 0,
    },
    hasSwingOutDoor: {
      yes: 0,
      no: 0,
    },
    hasLargeStall: {
      yes: 0,
      no: 0,
    },
    hasTallSinks: {
      yes: 0,
      no: 0,
    },
    hasLoweredSinks: {
      yes: 0,
      no: 0,
    },
    hasSupportAroundToilet: {
      yes: 0,
      no: 0,
    },
    hasSecondEntry: {
      yes: 0,
      no: 0,
    },
    hasWellLit: {
      yes: 0,
      no: 0,
    },
    isQuiet: {
      yes: 0,
      no: 0,
    },
    isSpacious: {
      yes: 0,
      no: 0,
    },
    location: {
      lat: 0,
      lng: 0,
    },
    name: '',
    formattedPhone: '',
    internationalPhone: '',
    photos: [],
    placeId: '',
    steps: {
      zero: 0,
      one: 0,
      two: 0,
      moreThanTwo: 0,
    },
    types: [],
    website: '',
  },
  welcomeVisibility: false,
  usesVisibility: false,
}

export default function venueReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState

    case SET_LOADING_VENUE:
      return { ...state, loadingVenue: action.loadingVenue }

    case SET_VENUE:
      return { ...state, venue: action.venue }

    case SET_WELCOME_VISIBILITY:
      return { ...state, welcomeVisibility: action.welcomeVisibility }

    case SET_USES_VISIBILITY:
      return { ...state, usesVisibility: action.usesVisibility }

    default:
      return state
  }
}
