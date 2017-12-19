import {
  CLEAR_STATE,
  SET_CREATE_REVIEW_VISIBLE,
  SET_NOTIFICATION_MESSAGE,
  SET_VENUE
} from './constants'

const initialState = {
  notificationMessage: '',
  createReviewVisible: false,
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
  }
}

export default function topBarReducer(state = initialState, action) {
  switch (action.type) {
    case CLEAR_STATE:
      return initialState

    case SET_CREATE_REVIEW_VISIBLE:
      return { ...state, createReviewVisible: action.createReviewVisible }

    case SET_NOTIFICATION_MESSAGE:
      return { ...state, notificationMessage: action.notificationMessage }

    case SET_VENUE:
      return { ...state, venue: action.venue }

    default:
      return state
  }
}
