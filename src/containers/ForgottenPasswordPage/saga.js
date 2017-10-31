import { all, call, put, select, takeLatest } from 'redux-saga/effects'

import { finishProgress, startProgress } from '../ProgressBar/actions'
import { forgottenPasswordEndpoint } from '../../api/authentication'
import makeSelectApp from '../App/selector'
import { setSendingRequest } from '../App/actions'

import { clearMessageErrors, setErrors, setMessageType } from './actions'
import { FORGOTTEN_PASSWORD_REQUEST } from './constants'
import makeSelectForgottenPage from './selector'

function* resetPasswordFlow() {
  const sendingRequest = yield select(makeSelectApp('sendingRequest'))
  if (sendingRequest) {
    return
  }

  const data = yield select(makeSelectForgottenPage('data'))
  const { email } = data

  yield put(clearMessageErrors())
  yield put(setSendingRequest(true))
  yield put(startProgress())

  try {
    yield call(forgottenPasswordEndpoint, email)
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
  yield takeLatest(FORGOTTEN_PASSWORD_REQUEST, resetPasswordFlow)
}
