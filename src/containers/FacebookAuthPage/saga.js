import { call, put, takeLatest } from 'redux-saga/effects'

import { facebookAuthEndpoint } from '../../api/authentication'

import { FACEBOOK_AUTH_REQUEST } from './constants'

import { authFailed, sendingRequest } from './actions'

function* facebookAuth(params) {
  yield put(sendingRequest(true))

  let response
  try {
    response = yield call(facebookAuthEndpoint, params.accessToken)
  } catch (error) {
    yield put(sendingRequest(false))
    yield put(authFailed(true))
    return
  }

  localStorage.setItem('facebookToken', response.data.accessToken)
  yield put(sendingRequest(false))
}

export default function* watchFacebookAuth() {
  yield takeLatest(FACEBOOK_AUTH_REQUEST, facebookAuth)
}
