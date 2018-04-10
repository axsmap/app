import { last } from 'lodash'
import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest, setUserData } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { createPhotoEndpoint, deletePhotoEndpoint } from '../../api/photos'
import appSelector from '../App/selector'
import { createTeamEndpoint } from '../../api/teams'

import { clearErrors, setAvatar, setErrors } from './actions'
import { CREATE_AVATAR, CREATE_TEAM, DELETE_AVATAR } from './constants'
import createTeamSelector from './selector'

function* createAvatarFlow({ data }) {
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

    yield put(setNotificationIsVisible(true))

    yield put(setSendingRequest(false))
    yield put(finishProgress())

    return
  }

  yield put(setSendingRequest(false))
  yield put(finishProgress())

  yield put(setAvatar(response.data.url))
}

function* deleteAvatarFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const avatar = yield select(createTeamSelector('avatar'))
  const avatarFileName = last(avatar.split('/'))

  try {
    yield call(deletePhotoEndpoint, avatarFileName)
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

  yield put(setAvatar(''))
}

function* createTeamFlow({ data, redirectTo }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(startProgress())
  yield put(setSendingRequest(true))

  const avatar = yield select(createTeamSelector('avatar'))

  let response
  try {
    response = yield call(createTeamEndpoint, {
      avatar: avatar || undefined,
      description: data.description,
      name: data.name
    })
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.CreateTeam.timeoutError')
      )
    } else if (err.response.status === 500) {
      yield put(
        setNotificationMessage('axsmap.components.CreateTeam.serverError')
      )
    } else if (err.response.status === 401) {
      return
    } else if (err.response.status === 423) {
      yield put(
        setNotificationMessage('axsmap.components.CreateTeam.blockedError')
      )
    } else if (err.response.status === 400) {
      yield put(
        setNotificationMessage('axsmap.components.CreateTeam.inputError')
      )
    }

    yield put(setNotificationIsVisible(true))

    const errors = err.response.data
    if (errors) {
      yield all(
        Object.keys(errors).map(key => put(setErrors(key, errors[key])))
      )
    }

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  const userData = yield select(appSelector('userData'))
  yield put(
    setUserData({
      ...userData,
      managedTeams: [
        ...userData.managedTeams,
        {
          id: response.data.id,
          avatar: response.data.avatar,
          name: response.data.name
        }
      ]
    })
  )

  yield put(setSendingRequest(false))
  yield put(finishProgress())

  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('axsmap.components.CreateTeam.success'))
  yield put(setNotificationIsVisible(true))

  redirectTo(`/teams/${response.data.id}`)
}

export default function* createTeamSaga() {
  yield takeLatest(CREATE_AVATAR, createAvatarFlow)
  yield takeLatest(DELETE_AVATAR, deleteAvatarFlow)
  yield takeLatest(CREATE_TEAM, createTeamFlow)
}
