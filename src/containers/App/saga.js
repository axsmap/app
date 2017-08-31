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

  axios.defaults.headers.common.Authorization = `JWT ${token}`

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

  yield put(changeAuthenticated(true))
}

export function* facebookLogin(facebookToken) {
  const response = yield call(facebookAuthEndpoint, facebookToken)
  localStorage.setItem('facebookToken', response.data.accessToken)
  localStorage.removeItem('googleToken')
  localStorage.removeItem('googleRefreshToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
  yield put(changeIsAuthenticating(false))
  yield put(changeAuthenticated(true))
}

export function* googleLogin(code) {
  const response = yield call(googleAuthEndpoint, code)
  localStorage.setItem('googleToken', response.data.accessToken)
  localStorage.setItem('googleRefreshToken', response.data.refreshToken)
  localStorage.removeItem('facebookToken')
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')
  yield put(changeIsAuthenticating(false))
  yield put(changeAuthenticated(true))
}

function* handleAuthentication() {
  const token = localStorage.getItem('token')
  const facebookToken = localStorage.getItem('facebookToken')

  if (facebookToken) {
    try {
      yield facebookLogin(facebookToken)
      return
    } catch (error) {
      localStorage.removeItem('facebookToken')
      yield removeAuthApp()
      return
    }
  }

  yield handleLogin(token, removeAuthApp)

  yield put(changeIsAuthenticating(false))
}

export default function* watchApp() {
  yield takeLatest(HANDLE_AUTHENTICATION, handleAuthentication)
}
