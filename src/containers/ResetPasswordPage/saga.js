import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { finishProgress, startProgress } from '../ProgressBar/actions'
import makeSelectApp from '../App/selector'
import { resetPasswordEndpoint } from '../../api/authentication'
import { setSendingRequest } from '../App/actions'

import { clearMessageErrors, setErrors, setMessageType } from './actions'
import makeSelectResetPassword from './selector'
import { RESET_PASSWORD_REQUEST } from './constants'

function* resetPasswordFlow(params) {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  const data = yield select(makeSelectResetPassword('data'))
  const { password } = data

  yield put(clearMessageErrors())
  yield put(setSendingRequest(true))
  yield put(startProgress())

  try {
    yield call(resetPasswordEndpoint, params.key, password)
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
    } else if (error.response.data.general === 'Password Ticket not found') {
      yield put(setMessageType('notFound'))
      return
    } else if (error.response.data.general === 'Password Ticket expired') {
      yield put(setMessageType('expired'))
      return
    } else if (error.response.data.general === 'User not found') {
      yield put(setMessageType('userNotFound'))
      return
    }

    const errors = error.response.data
    yield all(Object.keys(errors).map(key => put(setErrors(key, errors[key]))))

    return
  }

  yield put(setMessageType('success'))
  yield put(setSendingRequest(false))
  yield put(finishProgress())
}

export default function* watchResetPassword() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPasswordFlow)
}
