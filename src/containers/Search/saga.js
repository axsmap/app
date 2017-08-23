/* eslint no-constant-condition: off */
import { CancelToken } from 'axios'
import {
  call,
  cancel,
  cancelled,
  fork,
  put,
  select,
  take
} from 'redux-saga/effects'
import { delay } from 'redux-saga'

import { positionErrors } from '../../components/Search/constants'
import makeSelectLanguage from '../LanguageProvider/selector'
import { getIPLocationEndpoint, getVenuesEndpoint } from '../../api/venues'

import { GET_LOCATION, GET_VENUES_REQUEST } from './constants'
import {
  setCurrentlySending,
  setLocation,
  setLocationError,
  setVenues
} from './actions'
import makeSelectSearch from './selector'

function* getVenues() {
  const getIPLocationSource = CancelToken.source()
  const getVenuesSource = CancelToken.source()

  yield put(setCurrentlySending(true))

  let location = yield select(makeSelectSearch('location'))
  if (!location) {
    try {
      location = yield call(getIPLocationEndpoint, getIPLocationSource)
    } catch (err) {
      yield put(setVenues([]))
      yield put(setCurrentlySending(false))
      return
    }

    yield put(setLocation(location))
  }

  const keyword = yield select(makeSelectSearch('input'))
  const getVenuesOptions = {
    location,
    keyword,
    type: yield select(makeSelectSearch('venueType')),
    language: yield select(makeSelectLanguage('locale')),
    source: getVenuesSource
  }

  let venues

  try {
    venues = yield call(getVenuesEndpoint, getVenuesOptions)
  } catch (err) {
    yield put(setVenues([]))
    yield put(setCurrentlySending(false))
    return
  }

  if (yield cancelled()) {
    getIPLocationSource.cancel()
    getVenuesSource.cancel()
  }

  yield put(setVenues(venues.results))
  yield put(setCurrentlySending(false))
}

function* watchGetVenues() {
  let getVenuesTask

  while (true) {
    yield take(GET_VENUES_REQUEST)

    yield call(delay, 1500)

    const currentlySending = yield select(makeSelectSearch('currentlySending'))
    if (currentlySending) {
      yield cancel(getVenuesTask)
    }

    getVenuesTask = yield fork(getVenues)
  }
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

function* watchGetLocation() {
  while (true) {
    yield take(GET_LOCATION)

    yield put(setCurrentlySending(true))

    if (navigator.geolocation) {
      try {
        const location = yield call(getLocationPromised)
        yield put(
          setLocation(
            `${location.coords.latitude},${location.coords.longitude}`
          )
        )
        yield call(getVenues)
      } catch (err) {
        if (err.code === 1) {
          yield put(setLocationError(positionErrors.PERMISSION_DENIED))
        } else if (err.code === 2) {
          yield put(setLocationError(positionErrors.POSITION_UNAVAILABLE))
        } else {
          yield put(setLocationError(positionErrors.TIMED_OUT))
        }
      } finally {
        yield put(setCurrentlySending(false))
      }
    } else {
      yield put(setLocationError(positionErrors.NOT_SUPPORTED))
    }
  }
}

export default function* searchSaga() {
  yield fork(watchGetLocation)
  yield fork(watchGetVenues)
}
