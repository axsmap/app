import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { fork } from 'redux-saga/effects'

import languageProviderReducer from './containers/LanguageProvider/reducer'
import resetPasswordReducer from './containers/ResetPasswordPage/reducer'
import resetPasswordSagas from './containers/ResetPasswordPage/sagas'
import signUpReducer from './containers/SignUpPage/reducer'
import signUpSagas from './containers/SignUpPage/sagas'

const sagas = [signUpSagas, resetPasswordSagas]

function* rootSaga() {
  yield sagas.map(saga => fork(saga))
}

const rootReducer = combineReducers({
  language: languageProviderReducer,
  resetPassword: resetPasswordReducer,
  signUp: signUpReducer
})
const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(sagaMiddleware),
    typeof window === 'object' &&
    typeof window.devToolsExtension !== 'undefined'
      ? window.devToolsExtension()
      : f => f
  )
)

sagaMiddleware.run(rootSaga)

export default store
