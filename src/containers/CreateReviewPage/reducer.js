import {
  CLEAR_ERRORS,
  CLEAR_STATE,
  SET_ERRORS,
  SET_LOADING_VENUE,
  SET_PHOTO,
  SET_VENUE
} from './constants'

const initialState = {
  loadingVenue: true,
  venue: {
    id: '',
    address: '',
    allowsGuideDog: {
      yes: 0,
      no: 0
    },
    bathroomReviews: 0,
    bathroomScore: null,
    coverPhoto: '',
    entryReviews: 0,
    entryScore: null,
    googleRating: null,
    googleUrl: '',
    hasParking: {
      yes: 0,
      no: 0
    },
    hasPermanentRamp: {
      yes: 0,
      no: 0
    },
    hasPortableRamp: {
      yes: 0,
      no: 0
    },
    has0Steps: {
      yes: 0,
      no: 0
    },
    has1Step: {
      yes: 0,
      no: 0
    },
    has2Steps: {
      yes: 0,
      no: 0
    },
    has3Steps: {
      yes: 0,
      no: 0
    },
    hasWideEntrance: {
      yes: 0,
      no: 0
    },
    hasAccessibleTableHeight: {
      yes: 0,
      no: 0
    },
    hasAccessibleElevator: {
      yes: 0,
      no: 0
    },
    hasInteriorRamp: {
      yes: 0,
      no: 0
    },
    hasSwingInDoor: {
      yes: 0,
      no: 0
    },
    hasSwingOutDoor: {
      yes: 0,
      no: 0
    },
    hasLargeStall: {
      yes: 0,
      no: 0
    },
    hasTallSinks: {
      yes: 0,
      no: 0
    },
    hasLoweredSinks: {
      yes: 0,
      no: 0
    },
    hasNoSupportAroundToilet: {
      yes: 0,
      no: 0
    },
    hasOneBarAroundToilet: {
      yes: 0,
      no: 0
    },
    hasTwoBarAroundToilet: {
      yes: 0,
      no: 0
    },
    hasSecondEntry: {
      yes: 0,
      no: 0
    },
    hasWellLit: {
      yes: 0,
      no: 0
    },
    isQuiet: {
      yes: 0,
      no: 0
    },
    isSpacious: {
      yes: 0,
      no: 0
    },
    location: {
      lat: 0,
      lng: 0
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
      moreThanTwo: 0
    },
    types: [],
    website: ''
  },
  errors: {
    comments: ''
  },
  photo: ''
}

export default function createReviewReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_ERRORS:
      return { ...state, errors: initialState.errors }

    case CLEAR_STATE:
      return initialState

    case SET_ERRORS:
      return {
        ...state,
        errors: { ...state.errors, [action.key]: action.value }
      }

    case SET_LOADING_VENUE:
      return { ...state, loadingVenue: action.loadingVenue }

    case SET_PHOTO:
      return { ...state, photo: action.photo }

    case SET_VENUE:
      return { ...state, venue: action.venue }

    default:
      return state
  }
}
