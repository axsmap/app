import { put, takeLatest } from 'redux-saga/effects'

import { facebookLogin } from '../App/saga'

import { FACEBOOK_AUTH_REQUEST } from './constants'

import { authFailed } from './actions'

function* facebookAuth(params) {
  try {
    yield facebookLogin(params.accessToken)
  } catch (error) {
    yield put(authFailed(true))
  }
}

export default function* watchFacebookAuth() {
  yield takeLatest(FACEBOOK_AUTH_REQUEST, facebookAuth)
}
