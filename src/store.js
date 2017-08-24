import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import appReducer from './containers/App/reducer'
import appSaga from './containers/App/saga'
import homeReducer from './containers/HomePage/reducer'
import forgottenPasswordReducer from './containers/ForgottenPasswordPage/reducer'
import forgottenPasswordSaga from './containers/ForgottenPasswordPage/saga'
import languageProviderReducer from './containers/LanguageProvider/reducer'
import signInReducer from './containers/SignInPage/reducer'
import signInSaga from './containers/SignInPage/saga'
import resetPasswordReducer from './containers/ResetPasswordPage/reducer'
import resetPasswordSaga from './containers/ResetPasswordPage/saga'
import searchReducer from './containers/Search/reducer'
import searchSaga from './containers/Search/saga'
import signUpReducer from './containers/SignUpPage/reducer'
import signUpSaga from './containers/SignUpPage/saga'

const sagas = [
  appSaga,
  forgottenPasswordSaga,
  resetPasswordSaga,
  searchSaga,
  signInSaga,
  signUpSaga
]

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}

const rootReducer = combineReducers({
  app: appReducer,
  home: homeReducer,
  forgottenPassword: forgottenPasswordReducer,
  language: languageProviderReducer,
  resetPassword: resetPasswordReducer,
  search: searchReducer,
  signIn: signInReducer,
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
