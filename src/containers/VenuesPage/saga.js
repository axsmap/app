import { call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setCategory as setNotificationCategory,
  setVisibility as setNotificationVisibility
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { getLocationEndpoint } from '../../api/google'
import makeSelectApp from '../App/selector'
import { getVenuesEndpoint } from '../../api/venues'

import {
  setCenterLocation,
  setLoadingMap,
  setNextPage,
  setNotificationMessage,
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

  yield put(setSendingRequest(true))
  yield put(startProgress())

  let centerLocation = yield select(makeSelectVenues('centerLocation'))
  if (centerLocation.lat === 0 && centerLocation.lng === 0) {
    try {
      centerLocation = yield call(getLocationEndpoint)
    } catch (error) {
      yield put(setNotificationCategory('error'))
      if (error.code === 'ECONNABORTED') {
        yield put(setNotificationMessage('timeoutError'))
      } else {
        yield put(setNotificationMessage('serverError'))
      }
      yield put(setNotificationVisibility(true))

      yield put(setVenues([]))
      yield put(setVisibleVenues([]))
      yield put(setNextPage(''))
      yield put(setLoadingMap(false))
      yield put(setSendingRequest(false))
      yield put(finishProgress())

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

  let response
  try {
    response = yield call(getVenuesEndpoint, getVenuesParams)
  } catch (error) {
    yield put(setNotificationCategory('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationVisibility(true))

    yield put(setVenues([]))
    yield put(setVisibleVenues([]))
    yield put(setNextPage(''))
    yield put(setLoadingMap(false))
    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setVenues(response.data.results))
  if (response.data.nextPage) {
    yield put(setNextPage(response.data.nextPage))
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
  yield put(setShowSearchHere(false))
  yield put(setNotificationVisibility(false))

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
      yield put(setNotificationCategory('error'))

      if (err.code === 1) {
        yield put(setNotificationMessage('userLocationError1'))
      } else if (err.code === 2) {
        yield put(setNotificationMessage('userLocationError2'))
      } else {
        yield put(setNotificationMessage('userLocationError3'))
      }

      yield put(setNotificationVisibility(true))
    } finally {
      yield put(setSendingRequest(false))
    }
  } else {
    yield put(setNotificationCategory('error'))
    yield put(setNotificationMessage('userLocationError4'))
    yield put(setNotificationVisibility(true))
    yield put(setSendingRequest(false))
  }
}

export default function* venuesSaga() {
  yield takeLatest(GET_VENUES, getVenuesFlow)
  yield takeLatest(GET_USER_LOCATION, getUserLocationFlow)
}
