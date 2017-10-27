import { applyMiddleware, compose, createStore, combineReducers } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { all, fork } from 'redux-saga/effects'

import appReducer from './containers/App/reducer'
import appSaga from './containers/App/saga'
import forgottenPasswordReducer from './containers/ForgottenPasswordPage/reducer'
import forgottenPasswordSaga from './containers/ForgottenPasswordPage/saga'
import languageProviderReducer from './containers/LanguageProvider/reducer'
import progressBarReducer from './containers/ProgressBar/reducer'
import resetPasswordReducer from './containers/ResetPasswordPage/reducer'
import resetPasswordSaga from './containers/ResetPasswordPage/saga'
import signInReducer from './containers/SignInPage/reducer'
import signInSaga from './containers/SignInPage/saga'
import signUpReducer from './containers/SignUpPage/reducer'
import signUpSaga from './containers/SignUpPage/saga'
import socialAuthReducer from './containers/SocialAuthPage/reducer'
import topBarReducer from './containers/TopBar/reducer'
import {
  watchFacebookAuth,
  watchGoogleAuth
} from './containers/SocialAuthPage/saga'

const sagas = [
  appSaga,
  forgottenPasswordSaga,
  resetPasswordSaga,
  signInSaga,
  signUpSaga,
  watchFacebookAuth,
  watchGoogleAuth
]

function* rootSaga() {
  yield all(sagas.map(saga => fork(saga)))
}

const rootReducer = combineReducers({
  app: appReducer,
  forgottenPassword: forgottenPasswordReducer,
  language: languageProviderReducer,
  progressBar: progressBarReducer,
  resetPassword: resetPasswordReducer,
  signIn: signInReducer,
  signUp: signUpReducer,
  socialAuth: socialAuthReducer,
  topBar: topBarReducer
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
