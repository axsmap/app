import { call, put, takeLatest } from 'redux-saga/effects'
import { jwtDecode } from 'jwt-decode';

import {
  facebookAuthEndpoint,
  googleAuthEndpoint
} from '../../api/authentication'
import { getProfileEndpoint } from '../../api/users'

import { setIsAuthenticated, setIsAuthenticating, setUserData } from './actions'
import { GET_PROFILE } from './constants'

function* clearAppState() {
  localStorage.removeItem('refreshToken')
  localStorage.removeItem('token')

  yield put(setUserData({}))
  yield put(setIsAuthenticating(false))
  yield put(setIsAuthenticated(false))
}

function* getProfileFlow() {
  const token = localStorage.getItem('token')
  if (!token) {
    yield clearAppState()
    return
  }

  let decodedData
  try {
    decodedData = jwtDecode(token)
  } catch (error) {
    yield clearAppState()
    return
  }

  const currentDate = new Date()
  const currentTime = currentDate.getTime()

  if (currentTime <= decodedData.exp) {
    yield clearAppState()
    return
  }

  let response
  try {
    response = yield call(getProfileEndpoint)
  } catch (error) {
    yield clearAppState()
    return
  }

  const {
    id,
    avatar,
    events,
    firstName,
    lastName,
    managedEvents,
    managedTeams,
    teams
  } = response.data
  const userData = {
    id,
    avatar,
    events,
    firstName,
    lastName,
    managedEvents,
    managedTeams,
    teams
  }
  yield put(setUserData(userData))

  yield put(setIsAuthenticated(true))
  yield put(setIsAuthenticating(false))
}

function* loginSocialCode(endpoint, code) {
  const response = yield call(endpoint, code)

  localStorage.setItem('token', response.data.token)
  localStorage.setItem('refreshToken', response.data.refreshToken)

  yield getProfileFlow()
}

export function* facebookLogin(code) {
  yield loginSocialCode(facebookAuthEndpoint, code)
}

export function* googleLogin(code) {
  yield loginSocialCode(googleAuthEndpoint, code)
}

export default function* appSaga() {
  yield takeLatest(GET_PROFILE, getProfileFlow)
}
