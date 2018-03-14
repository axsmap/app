import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { resetPasswordEndpoint } from '../../api/authentication'
import appSelector from '../App/selector'

import { clearMessageErrors, setErrors } from './actions'
import { RESET_PASSWORD_REQUEST } from './constants'
import resetPasswordSelector from './selector'

function* resetPasswordFlow({ key, redirectTo }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  yield put(clearMessageErrors())

  const data = yield select(resetPasswordSelector('data'))
  const { password } = data

  try {
    yield call(resetPasswordEndpoint, key, password)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage('axsmap.components.ResetPassword.timeoutError')
      )
    } else if (err.response.data.general === 'Something went wrong') {
      yield put(
        setNotificationMessage('axsmap.components.ResetPassword.serverError')
      )
    } else if (err.response.data.general === 'Password Ticket not found') {
      yield put(
        setNotificationMessage('axsmap.components.ResetPassword.notFoundError')
      )
    } else if (err.response.data.general === 'Password Ticket expired') {
      yield put(
        setNotificationMessage('axsmap.components.ResetPassword.expiredError')
      )
    } else if (err.response.data.general === 'User not found') {
      yield put(
        setNotificationMessage(
          'axsmap.components.ResetPassword.userNotFoundError'
        )
      )
    } else if (err.response.status === 400) {
      yield put(
        setNotificationMessage('axsmap.components.ResetPassword.inputError')
      )
    }

    yield put(setNotificationIsVisible(true))

    const errors = err.response.data
    if (errors) {
      yield all(
        Object.keys(errors).map(errKey =>
          put(setErrors(errKey, errors[errKey]))
        )
      )
    }

    yield put(finishProgress())
    yield put(setSendingRequest(false))

    return
  }

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationType('success'))
  yield put(setNotificationMessage('axsmap.components.ResetPassword.success'))
  yield put(setNotificationIsVisible(true))

  redirectTo('/sign-in')
}

export default function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordFlow)
}
