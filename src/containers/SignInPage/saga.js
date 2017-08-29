import { call, put, select, takeLatest } from 'redux-saga/effects'

import { changeAuthenticated } from '../App/actions'
import { handleLogin } from '../App/saga'
import { signInEndpoint } from '../../api/authentication'

import { SIGN_IN_REQUEST } from './constants'

import { clearMessages, requestError, sendingRequest } from './actions'

import makeSelectSignIn from './selector'

function* removeAuth() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
  yield put(sendingRequest(false))
  yield put(changeAuthenticated(false))
}

function* signIn() {
  const currentlySending = yield select(makeSelectSignIn('currentlySending'))
  if (currentlySending) {
    return
  }

  const data = yield select(makeSelectSignIn('data'))
  const { email, password } = data

  yield put(clearMessages())
  yield put(sendingRequest(true))

  let response
  try {
    response = yield call(signInEndpoint, email, password)
  } catch (error) {
    console.log(error)
    yield put(sendingRequest(false))
    yield put(requestError(error.response.data))
    return
  }
  console.log('paso')

  localStorage.setItem('refreshToken', response.data.refreshToken)
  localStorage.setItem('token', response.data.token)
  localStorage.removeItem('facebookAuth')

  yield handleLogin(response.data.token, removeAuth)

  yield put(sendingRequest(false))
}

export default function* watchSignIn() {
  yield takeLatest(SIGN_IN_REQUEST, signIn)
}
