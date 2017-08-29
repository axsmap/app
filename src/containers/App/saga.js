import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import jwtDecode from 'jwt-decode'

import { facebookAuthEndpoint } from '../../api/authentication'
import { getUserEndpoint } from '../../api/users'

import { HANDLE_AUTHENTICATION } from './constants'
import {
  changeAuthenticated,
  changeIsAuthenticating,
  changeUserData
} from './actions'

function* removeAuth() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')

  const userData = { id: '', avatar: '', firstName: '' }
  yield put(changeUserData(userData))
  yield put(changeIsAuthenticating(false))
  yield put(changeAuthenticated(false))
}

function* handleAuthentication() {
  const token = localStorage.getItem('token')
  const facebookToken = localStorage.getItem('facebookToken')

  if (facebookToken) {
    try {
      const response = yield call(facebookAuthEndpoint, facebookToken)
      localStorage.setItem('facebookToken', response.data.accessToken)
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('token')
      yield put(changeIsAuthenticating(false))
      yield put(changeAuthenticated(true))
      return
    } catch (error) {
      localStorage.removeItem('facebookToken')
      yield removeAuth()
      return
    }
  }

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
  const userID = decodedData.userID
  try {
    response = yield call(getUserEndpoint, userID)
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

export default function* watchApp() {
  yield takeLatest(HANDLE_AUTHENTICATION, handleAuthentication)
}
