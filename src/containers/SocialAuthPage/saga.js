import { put, takeLatest } from 'redux-saga/effects'

import { facebookLogin, googleLogin } from '../App/saga'

import { FACEBOOK_AUTH_REQUEST, GOOGLE_AUTH_REQUEST } from './constants'

import { authFailed } from './actions'

function* facebookAuth(params) {
  try {
    yield facebookLogin(params.accessToken)
  } catch (error) {
    yield put(authFailed(true))
  }
}

function* googleAuth(params) {
  try {
    yield googleLogin(params.code)
  } catch (error) {
    yield put(authFailed(true))
  }
}

export function* watchFacebookAuth() {
  yield takeLatest(FACEBOOK_AUTH_REQUEST, facebookAuth)
}

export function* watchGoogleAuth() {
  yield takeLatest(GOOGLE_AUTH_REQUEST, googleAuth)
}
