import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { forgottenPasswordEndpoint } from '../../api/authentication'
import appSelector from '../App/selector'

import { clearMessageErrors, setErrors } from './actions'
import { FORGOTTEN_PASSWORD_REQUEST } from './constants'
import forgottenPageSelector from './selector'

function* resetPasswordFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(clearMessageErrors())

  yield put(setSendingRequest(true))
  yield put(startProgress())

  const data = yield select(forgottenPageSelector('data'))
  const { email } = data

  try {
    yield call(forgottenPasswordEndpoint, email)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(
        setNotificationMessage(
          'axsmap.components.ForgottenPassword.timeoutError'
        )
      )
    } else if (err.response.status === 500) {
      yield put(
        setNotificationMessage(
          'axsmap.components.ForgottenPassword.serverError'
        )
      )
    } else if (err.response.status === 400) {
      yield put(
        setNotificationMessage('axsmap.components.ForgottenPassword.inputError')
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

  yield put(finishProgress())
  yield put(setSendingRequest(false))

  yield put(setNotificationType('success'))
  yield put(
    setNotificationMessage('axsmap.components.ForgottenPassword.success')
  )
  yield put(setNotificationIsVisible(true))
}

export default function* resetPasswordSaga() {
  yield takeLatest(FORGOTTEN_PASSWORD_REQUEST, resetPasswordFlow)
}
