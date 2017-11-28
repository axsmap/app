import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { setAuthenticated, setSendingRequest } from '../App/actions'
import {
  setCategory as setNotificationCategory,
  setVisibility as setNotificationVisibility
} from '../Notification/actions'
import { finishProgress, startProgress } from '../ProgressBar/actions'
import { signInEndpoint } from '../../api/authentication'
import { handleLogin } from '../App/saga'
import makeSelectApp from '../App/selector'

import {
  clearMessageErrors,
  setErrors,
  setNotificationMessage
} from './actions'
import { SIGN_IN_REQUEST } from './constants'
import makeSelectSignIn from './selector'

function* removeAuth() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
  yield put(setSendingRequest(false))
  yield put(setAuthenticated(false))
}

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
      yield put(setNotificationCategory('error'))
      yield put(setNotificationMessage('timeoutError'))
      yield put(setNotificationVisibility(true))
      return
    } else if (error.response.data.error) {
      yield put(setNotificationCategory('error'))
      yield put(setNotificationMessage('excessError'))
      yield put(setNotificationVisibility(true))
      return
    } else if (error.response.data.general === 'Something went wrong') {
      yield put(setNotificationCategory('error'))
      yield put(setNotificationMessage('serverError'))
      yield put(setNotificationVisibility(true))
      return
    } else if (error.response.data.general === 'Email or password incorrect') {
      yield put(setNotificationCategory('error'))
      yield put(setNotificationMessage('fieldsError'))
      yield put(setNotificationVisibility(true))
      return
    } else if (error.response.data.general === 'You are blocked') {
      yield put(setNotificationCategory('error'))
      yield put(setNotificationMessage('blockError'))
      yield put(setNotificationVisibility(true))
      return
    }

    const errors = error.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    return
  }

  localStorage.setItem('refreshToken', response.data.refreshToken)
  localStorage.setItem('token', response.data.token)

  yield handleLogin(response.data.token, removeAuth)

  yield put(finishProgress())
  yield put(setSendingRequest(false))
}

export default function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signInFlow)
}
