import { last } from 'lodash'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest, setUserData } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { createMapathonEndpoint } from '../../api/mapathons'
import { createPhotoEndpoint, deletePhotoEndpoint } from '../../api/photos'
import { getTeamsEndpoint } from '../../api/teams'
import appSelector from '../App/selector'

import {
  clearErrors,
  setErrors,
  setLoadingTeams,
  setLocationCoordinates,
  setPoster,
  setTeams
} from './actions'
import {
  CREATE_MAPATHON,
  CREATE_POSTER,
  DELETE_POSTER,
  GET_TEAMS,
  GET_USER_LOCATION
} from './constants'
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
        yield put(
          setNotificationMessage(
            'axsmap.components.CreateMapathon.userLocationError1'
          )
        )
      } else if (err.code === 2) {
        yield put(
          setNotificationMessage(
            'axsmap.components.CreateMapathon.userLocationError2'
          )
        )
      } else {
        yield put(
          setNotificationMessage(
            'axsmap.components.CreateMapathon.userLocationError3'
          )
        )
      }

      yield put(setNotificationIsVisible(true))
    } finally {
      yield put(setSendingRequest(false))
    }
  } else {
    yield put(setNotificationType('error'))
    yield put(
      setNotificationMessage(
        'axsmap.components.CreateMapathon.userLocationError4'
      )
    )
    yield put(setNotificationIsVisible(true))
    yield put(setSendingRequest(false))
  }
}

function* createPosterFlow({ data }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(clearErrors())

  yield put(setSendingRequest(true))
  yield put(startProgress())

  let response
  try {
    response = yield call(createPhotoEndpoint, data)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.timeoutError')
      )
    } else if (err.response.status === 500) {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.serverError')
      )
    }

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setSendingRequest(false))
  yield put(finishProgress())

  yield put(setPoster(response.data.url))
}

function* deletePosterFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const poster = yield select(createMapathonSelector('poster'))
  const posterFileName = last(poster.split('/'))

  try {
    yield call(deletePhotoEndpoint, posterFileName)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.timeoutError')
      )
    } else if (err.response.status === 500) {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.serverError')
      )
    }

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setSendingRequest(false))
  yield put(finishProgress())

  yield put(setPoster(''))
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
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.timeoutError')
      )
    } else {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.serverError')
      )
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
  const poster = yield select(createMapathonSelector('poster'))

  let response
  try {
    response = yield call(createMapathonEndpoint, {
      ...data,
      description: data.description ? data.description : undefined,
      donationAmounts: data.donationAmounts.map(d => ({
        value: Number(d.value)
      })),
      donationGoal: data.donationGoal ? Number(data.donationGoal) : undefined,
      endDate: data.endDate ? data.endDate.toISOString() : undefined,
      locationCoordinates: [locationCoordinates.lat, locationCoordinates.lng],
      participantsGoal: data.participantsGoal
        ? Number(data.participantsGoal)
        : undefined,
      poster: poster || undefined,
      reviewsGoal: data.reviewsGoal ? Number(data.reviewsGoal) : undefined,
      startDate: data.startDate ? data.startDate.toISOString() : undefined
    })
  } catch (err) {
    yield put(setSendingRequest(false))
    yield put(finishProgress())

    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.timeoutError')
      )
    } else if (err.response.status === 500) {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.serverError')
      )
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.blockedError')
      )
    } else if (err.response.status === 400) {
      yield put(
        setNotificationMessage('axsmap.components.CreateMapathon.inputError')
      )
    }

    yield put(setNotificationIsVisible(true))

    const errors = err.response.data
    if (errors) {
      yield all(
        Object.keys(errors).map(key => put(setErrors(key, errors[key])))
      )
    }

    return
  }

  const userData = yield select(appSelector('userData'))
  yield put(
    setUserData({
      ...userData,
      managedEvents: [
        ...userData.managedEvents,
        {
          id: response.data.id,
          endDate: response.data.endDate,
          name: response.data.name,
          poster: response.data.poster,
          startDate: response.data.startDate
        }
      ]
    })
  )

  yield put(setSendingRequest(false))
  yield put(finishProgress())

  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('axsmap.components.CreateMapathon.success'))
  yield put(setNotificationIsVisible(true))

  redirectTo(`/mapathons/${response.data.id}`)
}

export default function* createMapathonSaga() {
  yield takeLatest(GET_USER_LOCATION, getUserLocationFlow)
  yield takeLatest(CREATE_POSTER, createPosterFlow)
  yield takeLatest(DELETE_POSTER, deletePosterFlow)
  yield takeLatest(GET_TEAMS, getTeamsFlow)
  yield takeLatest(CREATE_MAPATHON, createMapathonFlow)
}
