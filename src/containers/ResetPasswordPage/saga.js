import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setType as setNotificationType,
  setIsVisible as setNotificationIsVisible
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { resetPasswordEndpoint } from '../../api/authentication'
import makeSelectApp from '../App/selector'

import {
  clearMessageErrors,
  setErrors,
  setNotificationMessage
} from './actions'
import { RESET_PASSWORD_REQUEST } from './constants'
import makeSelectResetPassword from './selector'

function* resetPasswordFlow(params) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  const data = yield select(makeSelectResetPassword('data'))
  const { password } = data

  yield put(clearMessageErrors())
  yield put(setSendingRequest(true))
  yield put(startProgress())

  try {
    yield call(resetPasswordEndpoint, params.key, password)
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
    } else if (error.response.data.general === 'Password Ticket not found') {
      yield put(setNotificationType('error'))
      yield put(setNotificationMessage('notFoundError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (error.response.data.general === 'Password Ticket expired') {
      yield put(setNotificationType('error'))
      yield put(setNotificationMessage('expiredError'))
      yield put(setNotificationIsVisible(true))
      return
    } else if (error.response.data.general === 'User not found') {
      yield put(setNotificationType('error'))
      yield put(setNotificationMessage('userNotFoundError'))
      yield put(setNotificationIsVisible(true))
      return
    }

    const errors = error.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationMessage('successMessage'))
}

export default function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordFlow)
}
