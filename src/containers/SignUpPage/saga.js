import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { signUpEndpoint } from '../../api/authentication'
import appSelector from '../App/selector'

import { clearMessageErrors, setErrors } from './actions'
import { SIGN_UP_REQUEST } from './constants'
import signUpSelector from './selector'

function* signUpFlow() {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  yield put(clearMessageErrors())

  const data = yield select(signUpSelector('data'))
  const { email, firstName, isSubscribed, lastName, password } = data

  try {
    yield call(
      signUpEndpoint,
      email,
      firstName,
      isSubscribed,
      lastName,
      password
    )
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.SignUp.timeoutError'))
    } else if (err.response.data.general === 'Something went wrong') {
      yield put(setNotificationMessage('axsmap.components.SignUp.serverError'))
    } else if (err.response.status === 400) {
      yield put(setNotificationMessage('axsmap.components.SignUp.inputError'))
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
  yield put(setNotificationMessage('axsmap.components.SignUp.success'))
  yield put(setNotificationIsVisible(true))
}

export default function* signUpSaga() {
  yield takeLatest(SIGN_UP_REQUEST, signUpFlow)
}
