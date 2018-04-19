import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { getProfile, setSendingRequest } from '../App/actions'
import {
  setIsVisible as setNotificationIsVisible,
  setMessage as setNotificationMessage,
  setType as setNotificationType
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { signInEndpoint } from '../../api/authentication'
import appSelector from '../App/selector'

import { clearMessageErrors, setErrors } from './actions'
import { SIGN_IN_REQUEST } from './constants'
import signInSelector from './selector'

function* signInFlow({ redirectTo }) {
  const sendingRequest = yield select(appSelector('sendingRequest'))
  if (sendingRequest) {
    return
  }

  yield put(setSendingRequest(true))
  yield put(startProgress())

  yield put(clearMessageErrors())

  const data = yield select(signInSelector('data'))
  const { email, password } = data

  let response
  try {
    response = yield call(signInEndpoint, email, password)
  } catch (err) {
    yield put(setNotificationType('error'))

    if (err.code === 'ECONNABORTED') {
      yield put(setNotificationMessage('axsmap.components.SignIn.timeoutError'))
    } else if (err.response.data.general === 'Something went wrong') {
      yield put(setNotificationMessage('axsmap.components.SignIn.serverError'))
    } else if (err.response.data.general === 'Email or password incorrect') {
      yield put(setNotificationMessage('axsmap.components.SignIn.fieldsError'))
    } else if (err.response.data.general === 'You are blocked') {
      yield put(setNotificationMessage('axsmap.components.SignIn.blockError'))
    } else if (err.response.status === 400) {
      yield put(setNotificationMessage('axsmap.components.SignIn.inputError'))
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

  localStorage.setItem('refreshToken', response.data.refreshToken)
  localStorage.setItem('token', response.data.token)

  yield put(getProfile())

  const referrer = yield select(appSelector('referrer'))
  if (referrer) {
    redirectTo(referrer)
  } else {
    redirectTo('/')
  }
}

export default function* signInSaga() {
  yield takeLatest(SIGN_IN_REQUEST, signInFlow)
}
