import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { signInEndpoint } from '../../api/authentication'
import makeSelectApp from '../App/selector'

import {
  clearMessageErrors,
  setErrors,
  setNotificationMessage
} from './actions'
import { SIGN_IN_REQUEST } from './constants'
import makeSelectSignIn from './selector'

function* signInFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  const data = yield select(makeSelectSignIn('data'))
  const { email, password } = data

  yield put(clearMessageErrors())
  yield put(setSendingRequest(true))
  yield put(startProgress())

  let response
  try {
    response = yield call(signInEndpoint, email, password)
  } catch (error) {
    yield put(finishProgress())
    yield put(setSendingRequest(false))

    if (error.code === 'ECONNABORTED') {
      yield put(setNotificationType('error'))
      yield put(setNotificationMessage('timeoutError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (error.response.data.error) {
      yield put(setNotificationType('error'))
      yield put(setNotificationMessage('excessError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (error.response.data.general === 'Something went wrong') {
      yield put(setNotificationType('error'))
      yield put(setNotificationMessage('serverError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (error.response.data.general === 'Email or password incorrect') {
      yield put(setNotificationType('error'))
      yield put(setNotificationMessage('fieldsError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (error.response.data.general === 'You are blocked') {
      yield put(setNotificationType('error'))
      yield put(setNotificationMessage('blockError'))
      yield put(setNotificationIsVisible(true))
      return
    }

    const errors = error.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    return
  }

  localStorage.setItem('refreshToken', response.data.refreshToken)
  localStorage.setItem('token', response.data.token)

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  window.location.reload()
}

export default function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signInFlow)
}
