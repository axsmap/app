import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { getLocationEndpoint } from '../../api/google'
// import { locationErrors } from '../../constants'
import makeSelectApp from '../App/selector'
import { getVenuesEndpoint } from '../../api/venues'

import {
  setCenterLocation,
  setLoadingMap,
  setNextPage,
  setShowSearchHere,
  setShowUserMarker,
  setUserLocation,
  setVenues,
  setVisibleVenues
} from './actions'
import { GET_USER_LOCATION, GET_VENUES } from './constants'
import makeSelectVenues from './selector'

function* getVenuesFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  let centerLocation = yield select(makeSelectVenues('centerLocation'))
  if (centerLocation.lat === 0 && centerLocation.lng === 0) {
    try {
      centerLocation = yield call(getLocationEndpoint)
    } catch (err) {
      yield put(setVenues([]))
      yield put(setVisibleVenues([]))
      yield put(setNextPage(''))
      yield put(setLoadingMap(false))
      yield put(setSendingRequest(false))
      return
    }

    yield put(setCenterLocation(centerLocation))
    yield put(setLoadingMap(false))
  }

  const userLocation = yield select(makeSelectVenues('userLocation'))

  let location
  if (userLocation.lat !== 0 && userLocation.lng !== 0) {
    location = userLocation
  } else {
    location = centerLocation
  }

  const keywords = yield select(makeSelectVenues('keywords'))

  const getVenuesParams = {
    location: `${location.lat},${location.lng}`,
    keywords
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  let response
  try {
    response = yield call(getVenuesEndpoint, getVenuesParams)
  } catch (error) {
    yield put(setVenues([]))
    yield put(setVisibleVenues([]))
    yield put(setNextPage(''))
    yield put(setLoadingMap(false))
    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setVenues(response.results))
  if (response.nextPage) {
    yield put(setNextPage(response.nextPage))
  } else {
    yield put(setNextPage(''))
  }

  const venues = yield select(makeSelectVenues('venues'))
  yield put(setVisibleVenues(venues.slice(0, 17)))

  yield put(setSendingRequest(false))
  yield put(finishProgress())
  yield put(setShowSearchHere(false))
}

function getLocationPromised() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      maximumAge: 5 * 60 * 1000,
      timeout: 10 * 1000
    })
  })
}

function* getUserLocationFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))

  if (navigator.geolocation) {
    try {
      const location = yield call(getLocationPromised)
      yield put(
        setUserLocation({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        })
      )
      yield put(setShowUserMarker(true))

      yield put(setSendingRequest(false))

      yield call(getVenuesFlow)
    } catch (err) {
      yield put(setSendingRequest(false))
      console.log(err)
    }
  }
}

export default function* venuesSaga() {
  yield takeLatest(GET_VENUES, getVenuesFlow)
  yield takeLatest(GET_USER_LOCATION, getUserLocationFlow)
}
