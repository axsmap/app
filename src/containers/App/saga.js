import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'

import {
  facebookAuthEndpoint,
  googleAuthEndpoint
} from '../../api/authentication'
import { getUserEndpoint } from '../../api/users'

import { HANDLE_AUTHENTICATION } from './constants'
import {
  changeAuthenticated,
  changeIsAuthenticating,
  changeUserData
} from './actions'

function* removeAuthApp() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')

  const userData = { id: '', avatar: '', firstName: '' }
  yield put(changeUserData(userData))
  yield put(changeIsAuthenticating(false))
  yield put(changeAuthenticated(false))
}

export function* handleLogin(token, removeAuth) {
  if (!token) {
    yield removeAuth()
    return
  }

  let decodedData
  try {
    decodedData = jwtDecode(token)
  } catch (error) {
    yield removeAuth()
    return
  }

  const currentDate = new Date()
  const currentTime = currentDate.getTime()

  if (currentTime <= decodedData.exp) {
    yield removeAuth()
    return
  }

  axios.defaults.headers.common.Authorization = `Bearer ${token}`

  let response
  const userId = decodedData.userId
  try {
    response = yield call(getUserEndpoint, userId)
  } catch (error) {
    yield removeAuth()
    return
  }

  const { _id, avatar, firstName } = response.data
  const userData = { id: _id, avatar, firstName }
  yield put(changeUserData(userData))

  yield put(changeIsAuthenticating(false))
  yield put(changeAuthenticated(true))
}

function* loginSocialCode(endpoint, code) {
  const response = yield call(endpoint, code)

  localStorage.setItem('token', response.data.token)
  localStorage.setItem('refreshToken', response.data.refreshToken)

  yield handleLogin(response.data.token, removeAuthApp)
}

export function* facebookLogin(code) {
  yield loginSocialCode(facebookAuthEndpoint, code)
}

export function* googleLogin(code) {
  yield loginSocialCode(googleAuthEndpoint, code)
}

function* handleAuthentication() {
  const token = localStorage.getItem('token')
  yield handleLogin(token, removeAuthApp)
}

export default function* watchApp() {
  yield takeLatest(HANDLE_AUTHENTICATION, handleAuthentication)
}
