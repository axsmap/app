import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { finishProgress, startProgress } from '../ProgressBar/actions'
import { handleLogin } from '../App/saga'
import makeSelectApp from '../App/selector'
import { setAuthenticated, setSendingRequest } from '../App/actions'
import { signInEndpoint } from '../../api/authentication'

import { clearMessageErrors, setErrors, setMessageType } from './actions'
import makeSelectSignIn from './selector'
import { SIGN_IN_REQUEST } from './constants'

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
    yield put(setSendingRequest(false))
    yield put(finishProgress())

    if (error.code === 'ECONNABORTED') {
      yield put(setMessageType('timeout'))
      return
    } else if (error.response.data.error) {
      yield put(setMessageType('excess'))
      return
    } else if (error.response.data.general === 'Something went wrong') {
      yield put(setMessageType('server'))
      return
    } else if (error.response.data.general === 'Email or password incorrect') {
      yield put(setMessageType('fields'))
      return
    } else if (error.response.data.general === 'You are blocked') {
      yield put(setMessageType('block'))
      return
    }

    const errors = error.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    return
  }

  localStorage.setItem('refreshToken', response.data.refreshToken)
  localStorage.setItem('token', response.data.token)

  yield handleLogin(response.data.token, removeAuth)

  yield put(setSendingRequest(false))
  yield put(finishProgress())
}

export default function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signInFlow)
}
