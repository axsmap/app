import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { createMapathonEndpoint } from '../../api/mapathons'
import { getTeamsEndpoint } from '../../api/teams'
import appSelector from '../App/selector'

import {
  clearErrors,
  setErrors,
  setLoadingTeams,
  setLocationCoordinates,
  setNotificationMessage,
  setTeams
} from './actions'
import { CREATE_MAPATHON, GET_TEAMS, GET_USER_LOCATION } from './constants'
import createMapathonSelector from './selector'

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
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(setNotificationIsVisible(false))

  if (navigator.geolocation) {
    try {
      const location = yield call(getLocationPromised)
      yield put(
        setLocationCoordinates({
          lat: location.coords.latitude,
          lng: location.coords.longitude
        })
      )

      yield put(setSendingRequest(false))
    } catch (err) {
      yield put(setNotificationType('error'))

      if (err.code === 1) {
        yield put(setNotificationMessage('userLocationError1'))
      } else if (err.code === 2) {
        yield put(setNotificationMessage('userLocationError2'))
      } else {
        yield put(setNotificationMessage('userLocationError3'))
      }

      yield put(setNotificationIsVisible(true))
    } finally {
      yield put(setSendingRequest(false))
    }
  } else {
    yield put(setNotificationType('error'))
    yield put(setNotificationMessage('userLocationError4'))
    yield put(setNotificationIsVisible(true))
    yield put(setSendingRequest(false))
  }
}

function* getTeamsFlow({ keywords }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))
  yield put(setLoadingTeams(true))

  const params = {
    keywords,
    managed: 1,
    page: 1,
    pageLimit: 5
  }

  let response
  try {
    response = yield call(getTeamsEndpoint, params)
  } catch (error) {
    yield put(setNotificationType('error'))
    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
    } else {
      yield put(setNotificationMessage('serverError'))
    }
    yield put(setNotificationIsVisible(true))

    yield put(setTeams([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeams(false))
    return
  }

  if (response.data.results.length === 0) {
    yield put(setTeams([]))
    yield put(finishProgress())
    yield put(setSendingRequest(false))
    yield put(setLoadingTeams(false))
    return
  }

  const teams = response.data.results.map(t => ({
    id: t.id,
    avatar: t.avatar,
    name: t.name
  }))
  yield put(setTeams(teams))

  yield put(finishProgress())
  yield put(setSendingRequest(false))
  yield put(setLoadingTeams(false))
}

function* createMapathonFlow({ data, redirectTo }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(clearErrors())
  yield put(setSendingRequest(true))
  yield put(startProgress())

  const locationCoordinates = yield select(
    createMapathonSelector('locationCoordinates')
  )
  try {
    yield call(createMapathonEndpoint, {
      ...data,
      donationAmounts: data.donationAmounts.map(d => ({
        value: Number(d.value),
        description: d.description
      })),
      donationGoal: data.donationGoal ? Number(data.donationGoal) : undefined,
      endDate: data.endDate ? data.endDate.toISOString() : undefined,
      locationCoordinates: [locationCoordinates.lat, locationCoordinates.lng],
      participantsGoal: data.participantsGoal
        ? Number(data.participantsGoal)
        : undefined,
      poster: data.poster ? data.poster : undefined,
      reviewsGoal: data.reviewsGoal ? Number(data.reviewsGoal) : undefined,
      startDate: data.startDate ? data.startDate.toISOString() : undefined
    })
  } catch (err) {
    yield put(setNotificationType('error'))
    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('timeoutError'))
      yield put(setNotificationIsVisible(true))
      yield put(setSendingRequest(false))
      yield put(finishProgress())
      return
    } else if (err.response.status === 500) {
      yield put(setNotificationMessage('serverError'))
      yield put(setNotificationIsVisible(true))
      yield put(setSendingRequest(false))
      yield put(finishProgress())
      return
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(setNotificationMessage('blockedError'))
      yield put(setNotificationIsVisible(true))
      yield put(setSendingRequest(false))
      yield put(finishProgress())
      return
    }

    const errors = err.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setSendingRequest(false))
  yield put(finishProgress())
  redirectTo('/mapathons')
}

export default function* createMapathonSaga() {
  yield takeLatest(GET_USER_LOCATION, getUserLocationFlow)
  yield takeLatest(GET_TEAMS, getTeamsFlow)
  yield takeLatest(CREATE_MAPATHON, createMapathonFlow)
}